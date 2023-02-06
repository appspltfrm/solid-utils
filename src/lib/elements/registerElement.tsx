import {AssignableType} from "@co.mmons/js-utils/core";
import {compose, ICustomElement, noShadowDOM, register} from "component-register";
import {getCurrentElement, withSolid} from "solid-element";
import {splitProps} from "solid-js";
import {SolidElement} from "./SolidElement";

export function registerElement<ElementType extends SolidElement>(tagName: string, elementConstructor: AssignableType<ElementType>) {

    if (customElements.get(tagName)) {
        return;
    }

    const extendedConstructor: {reactive: {[propName: string]: boolean}, __shadowStyles: string | string[]} = elementConstructor as any;

    const propsDefinitions: {[propName: string]: {
            value: undefined;
            attribute: string;
            notify: boolean;
            reflect: boolean;
            parse: boolean;
        }} = {slottedChildren: undefined as any};

    for (const propName of Object.keys(extendedConstructor.reactive ?? {})) {
        propsDefinitions[propName] = Object.assign({value: undefined});
    }

    const connectedCallback = elementConstructor.prototype.connectedCallback;
    const disconnectedCallback = elementConstructor.prototype.disconnectedCallback;

    const finalConstructor = compose(register(tagName, propsDefinitions, {BaseElement: elementConstructor}), withSolid)((rawProps) => {

        const shadowStyles = extendedConstructor.__shadowStyles;
        const [children, props] = splitProps(rawProps, ["slottedChildren"]);
        const element = getCurrentElement() as any as SolidElement & ICustomElement;

        if (!element.renderRoot) {
            Object.defineProperty(element, "renderRoot", {value: element.shadowRoot || element.attachShadow({mode: "open"})});
        }

        if (connectedCallback) {
            connectedCallback.call(element);
        }

        if (disconnectedCallback) {
            element.addReleaseCallback(() => disconnectedCallback.call(element));
        }

        return <>
            {element.renderRoot === element.shadowRoot && shadowStyles && (typeof shadowStyles === "string" ? [shadowStyles] : shadowStyles).map(style => <style>{style}</style>)}
            {element["template"]({props, children: children?.["slottedChildren"] ?? []})}
        </>
    });
}
