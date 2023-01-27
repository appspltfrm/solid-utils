import type {AssignableType, Type} from "@co.mmons/js-utils/core";
import {children, Component, ParentProps, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {camelPropsToDashedAttrs} from "./camelPropsToDashedAttrs";
import {CustomElement} from "./CustomElement";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";
import {registerElement} from "./registerElement";

export type ElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    configure<Props = ComponentProps, Events extends {[P in keyof Events]: Event} = any>(): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
}

export function elementComponent<TagName extends string, ElementType extends CustomElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, ElementProps<ElementType>> {

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
    component["configure"] = () => {
        return component as any;
    }

    return component as any;
}
