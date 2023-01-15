import { Type } from "@co.mmons/js-utils/core";
import { Component } from "solid-js";
import { JSX } from "solid-js/h/jsx-runtime";
import { SetRequired } from "type-fest";
import { CustomElement } from "./CustomElement";
import { ElementEventsProps } from "./ElementEventsProps";
import { ElementProps } from "./ElementProps";
type ElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = any> = Component<JSX.HTMLAttributes<ElementType> & ComponentProps> & {
    tagName: TagName;
    events<Events extends {
        [EventName in keyof Events]: Event;
    }>(): ElementComponent<TagName, ElementType, ComponentProps & ElementEventsProps<ElementType, Events>>;
    required<PropName extends keyof ElementProps<ElementType>>(first: PropName, ...others: PropName[]): ElementComponent<TagName, ElementType, ComponentProps & SetRequired<ElementProps<ElementType>, PropName>>;
};
export declare function elementComponent<TagName extends string, ElementType extends CustomElement>(tagName: TagName, elementType: Type<ElementType>): ElementComponent<TagName, ElementType, Omit<ElementProps<ElementType>, keyof HTMLElement | keyof CustomElement>>;
export {};
