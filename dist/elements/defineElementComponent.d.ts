import { AssignableType } from "@co.mmons/js-utils/core";
import type { JSX, ParentProps } from "solid-js";
import { Component } from "solid-js";
import { ElementAttrAttributes } from "./ElementAttrAttributes";
import { ElementEventsProps } from "./ElementEventsProps";
import { ElementProps } from "./ElementProps";
import { SolidElement } from "./SolidElement";
type DefineElementFn = () => void;
export type ElementComponent<TagName extends string, ElementType extends SolidElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    register(): void;
};
export type NonSolidElementComponent<TagName extends string, Props, ComponentElement extends HTMLElement> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {
    tagName: TagName;
    register: () => void;
};
export interface NonSolidElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {
        [key: string]: any;
    };
    propsHandler?: (props: {
        [key: string]: any;
    }) => void;
}
export declare function defineElementComponent<TagName extends string, ElementType extends SolidElement, Props = ElementProps<ElementType>, Events extends {
    [P in keyof Events]: Event;
} = any>(tagName: TagName, elementType: AssignableType<ElementType>, props?: Props, events?: Events): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
export declare function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: true, options?: NonSolidElementComponentOptions): NonSolidElementComponent<TagName, Props & ParentProps, ComponentElement>;
export declare function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: false, options?: NonSolidElementComponentOptions): NonSolidElementComponent<TagName, Props, ComponentElement>;
export {};
