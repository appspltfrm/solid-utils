import {ComponentProp} from "./ComponentProp";

export abstract class ComponentDefinition {
    abstract readonly tagName: string;
    readonly shadow?: boolean;
    readonly styles?: string | string[];
    readonly baseElement?: typeof HTMLElement;
    readonly props?: {[propName: string]: ComponentProp<any>};
    readonly events?: {};
}
