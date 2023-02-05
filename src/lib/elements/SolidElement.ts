import {JSXElement} from "solid-js";
import {ElementTemplate} from "./ElementTemplate";

export abstract class SolidElement extends HTMLElement {
    protected abstract template(args: ElementTemplate<this>): JSXElement;
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
