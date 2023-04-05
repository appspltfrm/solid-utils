import {CustomElementReactiveProp} from "../CustomElementReactiveProp";

export interface CustomElementOptions extends Partial<ShadowRootInit> {
    reactive?: {[propName: string]: boolean | CustomElementReactiveProp};
    renderRoot?: "shadow" | "element";
    styles?: string | string[];
}
