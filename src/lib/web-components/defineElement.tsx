import {compose, register} from "component-register";
import {getCurrentElement, withSolid} from "solid-element";
import {Fragment, JSX} from "solid-js/h/jsx-runtime";

export function defineElement(tagName: string) {
    return function(proto: any) {

        const extendedProto: {__reactive: string[]} = proto;

        const propsDefinitions: {[propName: string]: {
            value: undefined;
            attribute: string;
            notify: boolean;
            reflect: boolean;
            parse: boolean;
        }} = {};

        for (const prop of extendedProto.__reactive ?? []) {
            propsDefinitions[prop] = Object.assign({value: undefined});
        }

        compose(register(tagName, propsDefinitions, {BaseElement: proto}), withSolid)((props) => {
            const element: {template: (props: any) => JSX.Element} = getCurrentElement() as any;
            return <Fragment>
                {element.template(props)}
            </Fragment>
        });
    }
}
