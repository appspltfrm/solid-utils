import {ComponentEventDefinition} from "./ComponentEventDefinition";
import {ComponentPropDefinition} from "./ComponentPropDefinition";

export abstract class ComponentDefinition {
    abstract readonly tagName: string;
    readonly shadow?: boolean;
    readonly styles?: string | string[];
    readonly baseElement?: typeof HTMLElement;
    readonly props?: {[propName: string]: ComponentPropDefinition<any>};
    readonly events?: {[eventName: string]: ComponentEventDefinition<any>};
}
