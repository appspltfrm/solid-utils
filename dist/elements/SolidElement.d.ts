import { JSXElement } from "solid-js";
import { ElementReactiveProp } from "./ElementReactiveProp";
import { ElementTemplate } from "./ElementTemplate";
export declare abstract class SolidElement extends HTMLElement {
    addDisconnectedCallback(callback: () => void): void;
    /**
     * Returns definition of reactive props.
     */
    protected static readonly reactive: {
        [propName: string]: boolean | ElementReactiveProp;
    };
    protected abstract template(args: ElementTemplate<this>): JSXElement;
    protected get renderRoot(): this | ShadowRoot;
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
