export abstract class WebComponentDefinition {
    abstract readonly tagName: string;
    readonly shadow?: boolean;
    readonly styles?: string | string[];
    readonly baseElement?: typeof HTMLElement;
    readonly props?: {};
    readonly events?: {};
}
