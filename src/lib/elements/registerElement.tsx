import {compose, register} from "component-register";
import {getCurrentElement, withSolid} from "solid-element";
import {Fragment, JSX} from "solid-js/h/jsx-runtime";

export function registerElement(tagName: string, elementConstructor: any) {

    if (customElements.get(tagName)) {
        return;
    }

    const extendedConstructor: {__reactive: string[]} = elementConstructor;

    const propsDefinitions: {[propName: string]: {
            value: undefined;
            attribute: string;
            notify: boolean;
            reflect: boolean;
            parse: boolean;
        }} = {};

    for (const prop of extendedConstructor.__reactive ?? []) {
        propsDefinitions[prop] = Object.assign({value: undefined});
    }

    const renderRoot = Object.getOwnPropertyDescriptor(elementConstructor.prototype, "renderRoot");

    const element = compose(register(tagName, propsDefinitions, {BaseElement: elementConstructor}), withSolid)((props) => {
        const element: {template: (props: any) => JSX.Element} = getCurrentElement() as any;
        return <Fragment>
                {element.template({props})}
            </Fragment>
    });

    if (renderRoot) {
        Object.defineProperty(element.prototype, "renderRoot", renderRoot);
    }

}
