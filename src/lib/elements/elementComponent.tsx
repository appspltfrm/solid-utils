import {AssignableType, Type} from "@co.mmons/js-utils/core";
import {children, Component, ParentProps, splitProps} from "solid-js";
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

export function elementComponent<TagName extends string, ElementType extends CustomElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, Omit<ElementProps<ElementType>, keyof HTMLElement | keyof CustomElement>> {

    registerElement(tagName, elementType);

    const extendedType: Type<ElementType> & {__reactive: string[], __noShadow: boolean} = elementType as any;

    const template: Component<any> = (rawProps: ParentProps<any>) => {
        const elementChildren = children(() => rawProps.children);
        const [, props, other] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);

        return <Dynamic component={tagName as any} {...camelPropsToDashedAttrs(props)} {...other} __children={elementChildren.toArray()}>
            {!extendedType.__noShadow && elementChildren}
        </Dynamic>
    }

    const component = template as any as ElementComponent<TagName, ElementType, ElementProps<ElementType>>;
    component["tagName"] = tagName;
    component["events"] = () => component;
    component["required"] = () => component;

    return component as any;
}
