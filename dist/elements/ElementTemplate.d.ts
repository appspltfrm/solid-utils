import { JSXElement } from "solid-js";
export type ElementTemplate<ReactiveProps extends {
    [key: string]: any;
} = any> = {
    props: ReactiveProps;
    children?: JSXElement;
};
