import {JSX} from "solid-js/h/jsx-runtime";
import {CustomElement} from "./CustomElement";
import {ElementProps} from "./ElementProps";

export type ElementTemplate<Element extends CustomElement> = {props: ElementProps<Element>, children?: JSX.Element};
