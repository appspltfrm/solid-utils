import { JSXElement } from "solid-js";
import { ElementTemplate } from "./ElementTemplate";
export declare abstract class SolidElement extends HTMLElement {
    /**
     * Returns definition of reactive props.
     */
    protected static readonly reactive: {
        [propName: string]: boolean;
    };
    protected abstract template(args: ElementTemplate<this>): JSXElement;
    protected get renderRoot(): this | ShadowRoot;
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
