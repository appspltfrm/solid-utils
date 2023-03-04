import {AssignableType, Type} from "@co.mmons/js-utils/core";
import type {JSX, ParentProps} from "solid-js";
import {children, Component, createEffect, createMemo, mergeProps, sharedConfig, splitProps} from "solid-js";
import {getNextElement, spread} from "solid-js/web";
import {ElementAttrAttributes} from "./ElementAttrAttributes";
import {ElementEventsProps} from "./ElementEventsProps";
import {ElementProps} from "./ElementProps";
import {registerElement} from "./registerElement";
import {SolidElement} from "./SolidElement";

type DefineElementFn = () => void;

export type ElementComponent<TagName extends string, ElementType extends SolidElement, ComponentProps = any> = Component<ComponentProps & JSX.HTMLAttributes<ElementType> & ElementAttrAttributes> & {
    tagName: TagName;
    register(): void
}

export type NonSolidElementComponent<TagName extends string, Props, ComponentElement extends HTMLElement> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {tagName: TagName, register: () => void};

type PropsHandler<P extends {[key: string]: any}> = (props: P) => P;

export interface NonSolidElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {[key: string]: any};
    propsHandler?: (props: {[key: string]: any}) => void;
}

export function defineElementComponent<TagName extends string, ElementType extends SolidElement, Props = ElementProps<ElementType>, Events extends {[P in keyof Events]: Event} = any>(tagName: TagName, elementType: AssignableType<ElementType>, props?: Props, events?: Events): ElementComponent<TagName, ElementType, Props & ElementEventsProps<ElementType, Events>>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: true, options?: NonSolidElementComponentOptions): NonSolidElementComponent<TagName, Props & ParentProps, ComponentElement>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: false, options?: NonSolidElementComponentOptions): NonSolidElementComponent<TagName, Props, ComponentElement>;

export function defineElementComponent(tagName: string, elementTypeOrChildrenAllowed: AssignableType | boolean, options?: NonSolidElementComponentOptions | any, events?: any): any {

    const solidElementType = typeof elementTypeOrChildrenAllowed !== "boolean" && elementTypeOrChildrenAllowed as AssignableType;

    function register() {

        if (customElements.get(tagName)) {
            return;

        } else if (solidElementType) {
            registerElement(tagName, solidElementType);

        } else if (options?.define) {
            for (const d of Array.isArray(options.define) ? options.define : [options.define]) {
                d();
            }
        }
    }

    let cmp: any;

    if (solidElementType) {

        const extendedType: Type & {reactive: {[propName: string]: boolean}} = solidElementType as any;

        cmp = (rawProps: ParentProps<any>) => {
            register();

            return () => {
                const el: any = sharedConfig.context ? getNextElement() : document.createElement(tagName);
                const noShadow = (el as any)["renderRoot"] === el;

                const rawChildren = children(() => rawProps.children);
                const [, props, others] = splitProps(rawProps, ["children"], Object.keys(extendedType.reactive ?? {}));


                createEffect(() => {
                    for (const propName of Object.keys(props)) {
                        const niu = props[propName];
                        const prev = el[propName];
                        if (niu !== prev) {
                            el[propName] = niu;
                        }
                    }

                    return props
                })

                createEffect(() => {
                    el.slottedChildren = (noShadow && rawChildren.toArray()) ?? [];
                })

                spread(el, mergeProps(others, {children: (!noShadow && rawChildren) ?? []}), false, noShadow);

                return el;
            }
        }

    } else {

        cmp = ((rawProps: any) => {

            register();

            const rawChildren = children(() => rawProps.children);
            const [_, others] = splitProps(rawProps, ["children"]);

            const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);

            if (options?.propsHandler) {
                createEffect(() => {
                    options?.propsHandler(others);
                })
            }

            spread(el, mergeProps(options?.initialProps, others, {children: (elementTypeOrChildrenAllowed && rawChildren) ?? []}), false, !elementTypeOrChildrenAllowed);

            return el;
        })
    }

    cmp["tagName"] = tagName;
    cmp["register"] = register;

    return cmp;
}
