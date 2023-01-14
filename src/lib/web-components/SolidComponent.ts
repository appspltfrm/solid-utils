import {Component} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {ComponentEvents} from "./ComponentEvents";
import {CustomHTMLElement} from "./CustomHTMLElement";
import {ElementProps} from "./ElementProps";

type BaseComponent<ElementType extends CustomHTMLElement> = Component<ElementProps<ElementType> & JSX.HTMLAttributes<ElementType>>;
export type SolidComponent<ElementType extends CustomHTMLElement, Props = ElementProps<ElementType> & JSX.HTMLAttributes<ElementType>> = Component<Props> & {
    events<T extends {[eventName: string]: Event}>(): Component<Props & ComponentEvents<T>>;
}
