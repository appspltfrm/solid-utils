import {Simplify} from "type-fest";
import {ComponentProp} from "./ComponentProp";

export type ComponentProps<
    Props extends {[P in PropName]: ComponentProp<PropType, PropRequired>},
    PropName extends keyof Props = keyof Props,
    PropType = Props[PropName] extends ComponentProp<infer T> ? T : never,
    PropRequired extends boolean = Props[PropName] extends ComponentProp<infer T, infer R> ? (R extends true ? true : false) : false
> =
    Simplify<{[P in keyof Props]?: (Props[P] extends ComponentProp<infer T> ? T : never)} & {[P in keyof Props as (Props[P] extends ComponentProp<infer T, infer R> ? (R extends true ? P : never) : never)]: (Props[P] extends ComponentProp<infer T> ? T : never)}>;
