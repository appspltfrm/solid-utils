import {JSX} from "solid-js/h/jsx-runtime";
import {KebabCasedProperties} from "type-fest";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";

export type ElementJSXIntrinsic<Element extends HTMLElement, Events extends {[P in keyof Events]: Event} = any> =
    KebabCasedProperties<ElementProps<Element>> & JSX.HTMLAttributes<Element> & ElementEventsProps<Element, Events>;
