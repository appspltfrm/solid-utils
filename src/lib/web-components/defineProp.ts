import {ComponentProp} from "./ComponentProp";

export function defineProp<Type = never, Required extends boolean = false, TypeNeeded extends Type = Type>(config?: Partial<ComponentProp<TypeNeeded>>) {
    return new ComponentProp<Type, Required>();
}
