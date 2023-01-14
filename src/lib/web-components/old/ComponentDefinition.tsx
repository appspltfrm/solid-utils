import {ComponentEventDefinition} from "./ComponentEventDefinition";
import {ComponentPropDefinition} from "./ComponentPropDefinition";
import {defineEvent} from "./defineEvent";
import {defineProp} from "./defineProp";

export abstract class ComponentDefinition {
    abstract readonly tagName: string;
    readonly shadow?: boolean;
    readonly styles?: string | string[];
    readonly element?: typeof HTMLElement;
    readonly props!: {[propName: string]: ComponentPropDefinition<any>};
    readonly events?: {[eventName: string]: ComponentEventDefinition<any>};

    prop<PropType, Readonly extends boolean = false>(config?: ComponentPropDefinition<PropType>) {
        return defineProp<PropType, Readonly>(config);
    }

    event<EventType extends Event>() {
        return defineEvent<EventType>();
    }
}
