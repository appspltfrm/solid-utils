import {ComponentPropDefinition} from "./ComponentPropDefinition";

export function defineProp<Type = never, Required extends boolean = false, TypeNeeded extends Type = Type>(config?: Partial<ComponentPropDefinition<TypeNeeded>>) {
    return new ComponentPropDefinition<Type, Required>();
}
