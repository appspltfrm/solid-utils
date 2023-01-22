import {JSX} from "solid-js/h/jsx-runtime";
import {ElementTemplate} from "./ElementTemplate";

export abstract class CustomElement extends HTMLElement {
    abstract template(args: ElementTemplate<this>): JSX.Element;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}

