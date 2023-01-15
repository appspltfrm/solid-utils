import { JSX } from "solid-js/h/jsx-runtime";
import { KebabCasedProperties } from "type-fest";
import { CustomElement } from "./CustomElement";
import { ElementEventsProps } from "./ElementEventsProps";
import { ElementProps } from "./ElementProps";
export type ElementJSXIntrinsic<Element extends CustomElement, Events extends {
    [P in keyof Events]: Event;
} = any> = KebabCasedProperties<ElementProps<Element>> & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;
