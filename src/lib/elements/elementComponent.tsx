import type {AssignableType, Type} from "@co.mmons/js-utils/core";
import {children, Component, ParentProps, sharedConfig, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {getNextElement, spread} from "solid-js/web";
import {camelPropsToDashedAttrs} from "./camelPropsToDashedAttrs";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";
import {registerElement} from "./registerElement";
import {SolidElement} from "./SolidElement";

export type ElementComponent<TagName extends string, ElementType extends SolidElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    configure<Props = ComponentProps, Events extends {[P in keyof Events]: Event} = any>(): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;
    register(): void
}

export function elementComponent<TagName extends string, ElementType extends SolidElement>(tagName: TagName, elementType: AssignableType<ElementType>): ElementComponent<TagName, ElementType, ElementProps<ElementType>> {

    const extendedType: Type<ElementType> & {reactive: {[propName: string]: boolean}} = elementType as any;

    const template: Component<any> = (rawProps: ParentProps<any>) => {

        if (!customElements.get(tagName)) {
            registerElement(tagName, elementType);
        }

        const rawChildren = children(() => rawProps.children);
        const [, props, others] = splitProps(rawProps, ["children"], Object.keys(extendedType.reactive ?? {}));

        const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);
        const noShadow = (el as any)["renderRoot"] === el;

        spread(el, {
            ...camelPropsToDashedAttrs(props),
            ...others,
            children: (!noShadow && rawChildren) ?? [],
            "slotted-children": (noShadow && rawChildren.toArray()) ?? []
        }, false, noShadow);

        return el;
    }

    const component = template as any as ElementComponent<TagName, ElementType, ElementProps<ElementType>>;
    component["tagName"] = tagName;
    component["configure"] = () => component as any;
    component["register"] = () => registerElement(tagName, elementType);

    return component as any;
}
