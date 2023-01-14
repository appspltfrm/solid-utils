import {JSX} from "solid-js/h/jsx-runtime";
import {ElementProps} from "./ElementProps";

export type ElementTemplate<Element extends HTMLElement> = (this: Element, props: ElementProps<Element>, children?: JSX.Element) => JSX.Element;
