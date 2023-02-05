import type {AssignableType, Type} from "@co.mmons/js-utils/core";
import {children, Component, ParentProps, sharedConfig, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {Dynamic, getNextElement, spread} from "solid-js/web";
import {camelPropsToDashedAttrs} from "./camelPropsToDashedAttrs";
import {SolidElement} from "./SolidElement";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";
import {registerElement} from "./registerElement";

export type ElementComponent<TagName extends string, ElementType extends SolidElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    configure<Props = ComponentProps, Events extends {[P in keyof Events]: Event} = any>(): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
}

export function elementComponent<TagName extends string, ElementType extends SolidElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, ElementProps<ElementType>> {

    registerElement(tagName, elementType);

    const extendedType: Type<ElementType> & {__reactive: string[], __noShadow: boolean} = elementType as any;

    const template: Component<any> = (rawProps: ParentProps<any>) => {
        const rawChildren = children(() => rawProps.children);
        const [, props, others] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);

        const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);

        spread(el, {
            ...camelPropsToDashedAttrs(props),
            ...others,
            children: (!extendedType.__noShadow && rawChildren) ?? [],
            "slotted-children": (extendedType.__noShadow && rawChildren.toArray()) ?? []
        }, false, !!extendedType.__noShadow);

        return el;
    }

    const component = template as any as ElementComponent<TagName, ElementType, ElementProps<ElementType>>;
    component["tagName"] = tagName;
    component["configure"] = () => {
        return component as any;
    }

    return component as any;
}
