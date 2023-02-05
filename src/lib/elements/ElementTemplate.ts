import {JSXElement} from "solid-js";
import {SolidElement} from "./SolidElement";
import {ElementProps} from "./ElementProps";

export type ElementTemplate<PropsOrElement extends (SolidElement | {[key: string]: any})> = {props: (PropsOrElement extends SolidElement ? ElementProps<PropsOrElement> : PropsOrElement), children?: JSXElement};
