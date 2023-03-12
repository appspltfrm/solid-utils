import {ICustomElement} from "component-register";
import {JSXElement} from "solid-js";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";
import {CustomElementTemplate} from "./CustomElementTemplate";

export abstract class CustomElement extends HTMLElement {

    addDisconnectedCallback(callback: () => void) {
        (this as any as ICustomElement).addReleaseCallback(callback);
    }

    /**
     * Returns definition of reactive props.
     */
    protected static readonly reactive: {[propName: string]: boolean | CustomElementReactiveProp};

    protected abstract template(args: CustomElementTemplate<this>): JSXElement;
    protected get renderRoot(): this | ShadowRoot {
        return this.shadowRoot || this.attachShadow({mode: "open"});
    }
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
