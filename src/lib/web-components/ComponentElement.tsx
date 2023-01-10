import {Simplify} from "type-fest";

export type ComponentElement<BaseType extends HTMLElement, Props = {}, Events = {}> = Simplify<BaseType & Props>;
