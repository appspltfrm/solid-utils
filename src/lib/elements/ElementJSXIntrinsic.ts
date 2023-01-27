import {JSX} from "solid-js/h/jsx-runtime";
import {CustomElement} from "./CustomElement";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";

type KebabCasePropName<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCasePropName<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
// export type ElementJSXIntrinsic<Element extends CustomElement, Props, Events extends {[P in keyof Events]: Event} = any> =
//     KebabCasedProperties<Props> & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;

export type ElementJSXIntrinsic<Element extends CustomElement, Props = ElementProps<Element>, Events extends {[P in keyof Events]: Event} = any> =
    JSX.HTMLAttributes<Element> & {[P in keyof Props as (P extends string ? KebabCasePropName<P> : never)]: Props[P]} & ElementEventsProps<Element, Events> & ElementAttrAttributes;
