import {AssignableType} from "@co.mmons/js-utils/core";
import {compose, ICustomElement, noShadowDOM, register} from "component-register";
import {getCurrentElement, withSolid} from "solid-element";
import {splitProps} from "solid-js";
import {Fragment, JSX} from "solid-js/h/jsx-runtime";
import {CustomElement} from "./CustomElement";

export function registerElement<ElementType extends CustomElement>(tagName: string, elementConstructor: AssignableType<ElementType>) {

    if (customElements.get(tagName)) {
        return;
    }

    const extendedConstructor: {__reactive: string[], __noShadow: boolean, __shadowStyles: string | string[]} = elementConstructor as any;

    const propsDefinitions: {[propName: string]: {
            value: undefined;
            attribute: string;
            notify: boolean;
            reflect: boolean;
            parse: boolean;
        }} = {__children: undefined as any};

    for (const prop of extendedConstructor.__reactive ?? []) {
        propsDefinitions[prop] = Object.assign({value: undefined});
    }

    const connectedCallback = elementConstructor.prototype.connectedCallback;
    const disconnectedCallback = elementConstructor.prototype.disconnectedCallback;

    const finalConstructor = compose(register(tagName, propsDefinitions, {BaseElement: elementConstructor}), withSolid)((rawProps) => {

        const shadow = !extendedConstructor.__noShadow;
        const shadowStyles = shadow && extendedConstructor.__shadowStyles;

        if (!shadow) {
            noShadowDOM();
        }

        const [children, props] = splitProps(rawProps, ["__children"]);
        const element = getCurrentElement() as any as CustomElement & ICustomElement;

        if (connectedCallback) {
            connectedCallback.call(element);
        }

        if (disconnectedCallback) {
            element.addReleaseCallback(() => disconnectedCallback.call(element));
        }

        return <Fragment>
            {shadowStyles && (typeof shadowStyles === "string" ? [shadowStyles] : shadowStyles).map(style => <style>{style}</style>)}
            {element.template({props, children: children?.["__children"] ?? []})}
        </Fragment>
    });
}
