import type { AssignableType } from "@co.mmons/js-utils/core";
import { Component } from "solid-js";
import { JSX } from "solid-js/h/jsx-runtime";
import { CustomElement } from "./CustomElement";
import { ElementEventsProps } from "./ElementEventsProps";
import { ElementProps } from "./ElementProps";
export type ElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = any> = Component<JSX.HTMLAttributes<ElementType> & ComponentProps> & {
    tagName: TagName;
    configure<Props = ComponentProps, Events extends {
        [P in keyof Events]: Event;
    } = any>(): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
};
export declare function elementComponent<TagName extends string, ElementType extends CustomElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, ElementProps<ElementType>>;
