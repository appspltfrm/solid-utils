import {Type} from "@co.mmons/js-utils/core";
import {Component, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {SetRequired} from "type-fest";
import {camelPropsToDashedAttrs} from "./camelPropsToDashedAttrs";
import {CustomElement} from "./CustomElement";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";
import {registerElement} from "./registerElement";

type ElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = any> = Component<JSX.HTMLAttributes<ElementType> & ComponentProps> & {
    tagName: TagName;
    events<Events extends {[EventName in keyof Events]: Event}>(): ElementComponent<TagName, ElementType, ComponentProps & ElementEventsProps<ElementType, Events>>;
    required<PropName extends keyof ElementProps<ElementType>>(first: PropName, ...others: PropName[]): ElementComponent<TagName, ElementType, ComponentProps & SetRequired<ElementProps<ElementType>, PropName>>;
}

export function elementComponent<TagName extends string, ElementType extends CustomElement>(tagName: TagName, elementType: Type<ElementType>): ElementComponent<TagName, ElementType, Omit<ElementProps<ElementType>, keyof HTMLElement | keyof CustomElement>> {

    registerElement(tagName, elementType);

    const extendedType: Type<ElementType> & {__reactive: string[]} = elementType as any;

    const template: Component<any> = (rawProps) => {
        const [, props, other] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);
        return <Dynamic component={tagName as any} {...camelPropsToDashedAttrs(props)} {...other}/>
    }

    const component: ElementComponent<TagName, ElementType, ElementProps<ElementType>> = template as any;
    component.tagName = tagName;
    component.events = () => component;
    component.required = () => component;

    return component as any;
}
