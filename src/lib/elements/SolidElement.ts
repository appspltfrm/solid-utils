import {ICustomElement} from "component-register";
import {JSXElement} from "solid-js";
import {ElementReactiveProp} from "./ElementReactiveProp";
import {ElementTemplate} from "./ElementTemplate";

export abstract class SolidElement extends HTMLElement {

    addDisconnectedCallback(callback: () => void) {
        (this as any as ICustomElement).addReleaseCallback(callback);
    }

    /**
     * Returns definition of reactive props.
     */
    protected static readonly reactive: {[propName: string]: boolean | ElementReactiveProp};

    protected abstract template(args: ElementTemplate<this>): JSXElement;
    protected get renderRoot(): this | ShadowRoot {
        return this.shadowRoot || this.attachShadow({mode: "open"});
    }
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
