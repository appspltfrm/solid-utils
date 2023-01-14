import {JSX} from "solid-js/h/jsx-runtime";
import {ElementProps} from "./ElementProps";

export type ElementTemplateArgs<Element extends HTMLElement> = {props: ElementProps<Element>, children?: JSX.Element};
