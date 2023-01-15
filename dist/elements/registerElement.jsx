import { compose, register } from "component-register";
import { getCurrentElement, withSolid } from "solid-element";
import { Fragment } from "solid-js/h/jsx-runtime";
export function registerElement(tagName, elementConstructor) {
    if (customElements.get(tagName)) {
        return;
    }
    const extendedConstructor = elementConstructor;
    const propsDefinitions = {};
    for (const prop of extendedConstructor.__reactive ?? []) {
        propsDefinitions[prop] = Object.assign({ value: undefined });
    }
    const renderRoot = Object.getOwnPropertyDescriptor(elementConstructor.prototype, "renderRoot");
    const element = compose(register(tagName, propsDefinitions, { BaseElement: elementConstructor }), withSolid)((props) => {
        const element = getCurrentElement();
        return <Fragment>
                {element.template({ props })}
            </Fragment>;
    });
    if (renderRoot) {
        Object.defineProperty(element.prototype, "renderRoot", renderRoot);
    }
}
//# sourceMappingURL=registerElement.jsx.map