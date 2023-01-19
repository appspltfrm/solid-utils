import { JSX } from "solid-js/h/jsx-runtime";
import { ElementTemplate } from "./ElementTemplate";
export declare abstract class CustomElement extends HTMLElement {
    abstract template(args: ElementTemplate<this>): JSX.Element;
    get renderRoot(): ShadowRoot | this;
}