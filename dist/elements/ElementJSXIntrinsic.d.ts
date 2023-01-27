import { JSX } from "solid-js/h/jsx-runtime";
import { CustomElement } from "./CustomElement";
import { ElementEventsProps } from "./ElementEventsProps";
type KebabCasePropName<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCasePropName<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
export type ElementJSXIntrinsic<Element extends CustomElement, Props, Events extends {
    [P in keyof Events]: Event;
} = any> = {
    [P in keyof Props as (P extends string ? KebabCasePropName<P> : never)]: Props[P];
} & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;
export {};
