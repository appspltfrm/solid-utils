import {Type} from "@co.mmons/js-utils/core";
import {Component, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {SetRequired} from "type-fest";
import {camelPropsToDashedAttrs} from "./camelPropsToDashedAttrs";
import {ElementEventsProps} from "./ElementEventsProps";
import {CustomHTMLElement} from "./CustomHTMLElement";
import {ElementProps} from "./ElementProps";

type SolidComponent<ElementType extends CustomHTMLElement, ComponentProps = any> = Component<JSX.HTMLAttributes<ElementType> & ComponentProps> & {
    events<Events extends {[EventName in keyof Events]: Event}>(): SolidComponent<ElementType, ComponentProps & ElementEventsProps<ElementType, Events>>;
    required<PropName extends keyof Props, Props = ElementProps<ElementType>>(first: PropName, ...others: PropName[]): SolidComponent<ElementType, ComponentProps & SetRequired<Props, PropName>>;
}

export function defineComponent<ElementType extends CustomHTMLElement>(elementType: Type<ElementType>): SolidComponent<ElementType, ElementProps<ElementType>> {

    const extendedType: Type<ElementType> & {__reactive: string[]} = elementType as any;
    const tagName = "web-test";

    const template: Component<any> = (rawProps) => {
        const [, props, other] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);
        return <Dynamic component={tagName as any} {...camelPropsToDashedAttrs(props)} {...other}/>
    }

    const component: SolidComponent<ElementType, ElementProps<ElementType>> = template as any;
    component.events = () => component;
    component.required = () => component;

    return component;
}
