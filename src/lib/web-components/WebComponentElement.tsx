import {JSX} from "solid-js/h/jsx-runtime";

export type WebComponentElement<BaseType extends HTMLElement, Props = {}, Events = {}> = BaseType & Props & JSX.HTMLAttributes<BaseType>;
