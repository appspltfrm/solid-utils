import {JSXElement} from "solid-js";
import {ElementProps} from "./ElementProps";
import {ElementTemplate} from "./ElementTemplate";

export abstract class CustomElement extends HTMLElement {
    protected abstract template(args: ElementTemplate<ElementProps<this>>): JSXElement;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}
