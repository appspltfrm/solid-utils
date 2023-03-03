import {AssignableType} from "@co.mmons/js-utils/core";
import {compose, ICustomElement, register} from "component-register";
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

    let renderRoot: PropertyDescriptor | undefined;

    let parentClass = elementConstructor;
    while (parentClass !== HTMLElement) {
        renderRoot = Object.getOwnPropertyDescriptor(parentClass.prototype, "renderRoot");
        if (renderRoot) {
            break;
        }
        parentClass = Object.getPrototypeOf(parentClass);
    }

    const finalConstructor = compose(register(tagName, propsDefinitions, {BaseElement: elementConstructor}), withSolid)((rawProps) => {

        const shadowStyles = extendedConstructor.__shadowStyles;
        const [children, props] = splitProps(rawProps, ["slottedChildren"]);
        const element = getCurrentElement() as any as SolidElement & ICustomElement;

        if (connectedCallback) {
            connectedCallback.call(element);
        }

        if (disconnectedCallback) {
            element.addReleaseCallback(() => disconnectedCallback.call(element));
        }

        return <>
            {element.renderRoot === element.shadowRoot && shadowStyles && (typeof shadowStyles === "string" ? [shadowStyles] : shadowStyles).map(style => <style>{style}</style>)}
            {element["template"]({props, children: children.slottedChildren ?? []})}
        </>
    });

    if (renderRoot?.get) {
        Object.defineProperty(finalConstructor.prototype, "renderRoot", {
            get() {
                const root = renderRoot?.get?.call(this);
                if (root) {
                    return root;
                } else {
                    const shadow = (this as HTMLElement).shadowRoot;
                    if (!shadow) {
                        return (this as HTMLElement).attachShadow({mode: "open"});
                    }
                }
            }
        })
    }
}
