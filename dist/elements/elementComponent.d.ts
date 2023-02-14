import type { AssignableType } from "@co.mmons/js-utils/core";
import { Component } from "solid-js";
import { JSX } from "solid-js/h/jsx-runtime";
import { ElementAttrAttributes } from "./ElementAttrAttributes";
import { ElementEventsProps } from "./ElementEventsProps";
import { ElementProps } from "./ElementProps";
import { SolidElement } from "./SolidElement";
export type ElementComponent<TagName extends string, ElementType extends SolidElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    configure<Props = ComponentProps, Events extends {
        [P in keyof Events]: Event;
    } = any>(): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
    register(): void;
};
export declare function elementComponent<TagName extends string, ElementType extends SolidElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, ElementProps<ElementType>>;
