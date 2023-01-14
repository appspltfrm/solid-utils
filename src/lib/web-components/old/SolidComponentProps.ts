import {Simplify} from "type-fest";
import {ComponentPropDefinition} from "./ComponentPropDefinition";

export type SolidComponentProps<
    Props extends {[P in PropName]: ComponentPropDefinition<PropType, PropRequired>},
    PropName extends keyof Props = keyof Props,
    PropType = Props[PropName] extends ComponentPropDefinition<infer T> ? T : never,
    PropRequired extends boolean = Props[PropName] extends ComponentPropDefinition<infer T, infer R> ? (R extends true ? true : false) : false
> =
    Simplify<{[P in keyof Props]?: (Props[P] extends ComponentPropDefinition<infer T> ? T : never)} & {[P in keyof Props as (Props[P] extends ComponentPropDefinition<infer T, infer R> ? (R extends true ? P : never) : never)]: (Props[P] extends ComponentPropDefinition<infer T> ? T : never)}>;

