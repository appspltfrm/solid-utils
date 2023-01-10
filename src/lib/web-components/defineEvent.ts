import {ComponentEventDefinition} from "./ComponentEventDefinition";

export function defineEvent<Type extends Event>() {
    return new ComponentEventDefinition<Type>();
}
