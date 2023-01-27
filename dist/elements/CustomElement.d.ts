import { JSXElement } from "solid-js";
import { ElementProps } from "./ElementProps";
import { ElementTemplate } from "./ElementTemplate";
export declare abstract class CustomElement extends HTMLElement {
    protected abstract template(args: ElementTemplate<ElementProps<this>>): JSXElement;
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
