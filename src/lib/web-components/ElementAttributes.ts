import {JSX} from "solid-js/h/jsx-runtime";
import {KebabCasedProperties} from "type-fest";
import {ElementProps} from "./ElementProps";

export type ElementAttributes<Element extends HTMLElement> = KebabCasedProperties<ElementProps<Element>> & JSX.HTMLAttributes<Element>;
