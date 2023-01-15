import {JSX} from "solid-js/h/jsx-runtime";
import {KebabCasedProperties} from "type-fest";
import {CustomElement} from "./CustomElement";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";

type Kebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
export type ElementJSXIntrinsic<Element extends CustomElement, Events extends {[P in keyof Events]: Event} = any> =
    KebabCasedProperties<ElementProps<Element>> & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;
