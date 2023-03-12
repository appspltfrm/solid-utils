import {JSX} from "solid-js/h/jsx-runtime";
import {SolidElement} from "./SolidElement";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementJSXEvents} from "./ElementJSXEvents";
import {ElementProps} from "./ElementProps";

type KebabCasePropName<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCasePropName<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
// export type ElementJSXIntrinsic<Element extends CustomElement, Props, Events extends {[P in keyof Events]: Event} = any> =
//     KebabCasedProperties<Props> & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;

export type ElementJSXIntrinsic<Element extends SolidElement, Props = ElementProps<Element>, Events extends {[P in keyof Events]: Event} = any> =
    JSX.HTMLAttributes<Element> & {[P in keyof Props as (P extends string ? KebabCasePropName<P> : never)]: Props[P]} & ElementJSXEvents<Element, Events> & ElementAttrAttributes;
