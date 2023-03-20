import {AssignableType} from "@co.mmons/js-utils/core";
import {compose, ICustomElement, register} from "component-register";
import {getCurrentElement, withSolid} from "solid-element";
import {splitProps} from "solid-js";
import {CustomElement} from "./CustomElement";

export function registerElement<ElementType extends CustomElement>(tagName: string, elementConstructor: AssignableType<ElementType>) {

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
        }} = {slottedChildren: {value: undefined, attribute: "slotted-children", notify: false, reflect: false, parse: false}};

    for (const [propName, propValue] of Object.entries(extendedConstructor.reactive ?? {})) {
        const propConfig = {value: undefined, notify: false, parse: false, reflect: false, attribute: undefined as any as string};

        if (typeof propValue === "object") {
            Object.assign(propConfig, propValue);
        }

        propsDefinitions[propName] = propConfig;
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

        const element = getCurrentElement() as any as CustomElement & ICustomElement;

        if (connectedCallback) {
            connectedCallback.call(element);
        }

        if (disconnectedCallback) {
            element.addReleaseCallback(() => disconnectedCallback.call(element));
        }

        if (element.renderRoot === element.shadowRoot) {
            return <>
                {element.renderRoot === element.shadowRoot && shadowStyles && (typeof shadowStyles === "string" ? [shadowStyles] : shadowStyles).map(style => <style>{style}</style>)}
                {element["template"]({props, children: children.slottedChildren ?? []})}
            </>
        } else {
            return element["template"]({props, children: children.slottedChildren ?? []});
        }
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
