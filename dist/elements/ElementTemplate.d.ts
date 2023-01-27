import { JSXElement } from "solid-js";
import { CustomElement } from "./CustomElement";
import { ElementProps } from "./ElementProps";
export type ElementTemplate<PropsOrElement extends (CustomElement | {
    [key: string]: any;
})> = {
    props: (PropsOrElement extends CustomElement ? ElementProps<PropsOrElement> : PropsOrElement);
    children?: JSXElement;
};
