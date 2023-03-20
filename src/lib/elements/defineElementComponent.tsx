import {AssignableType, Type} from "@co.mmons/js-utils/core";
import type {JSX, ParentProps} from "solid-js";
import {
    children,
    Component,
    createEffect,
    createMemo,
    createRenderEffect,
    mergeProps,
    sharedConfig,
    splitProps
} from "solid-js";
import {assign, getNextElement, spread} from "solid-js/web";
import {CustomElementJSXAttributes} from "./CustomElementJSXAttributes";
import {CustomElementJSXEvents} from "./CustomElementJSXEvents";
import {CustomElementProps} from "./CustomElementProps";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";
import {registerElement} from "./registerElement";
import {CustomElement} from "./CustomElement";

type DefineElementFn = () => void;

export type CustomElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = CustomElementProps<ElementType>> = Component<ComponentProps & CustomElementJSXAttributes> & {
    tagName: TagName;
    register(): void
}

export type ElementComponent<TagName extends string, Props, ComponentElement extends HTMLElement> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {tagName: TagName, register: () => void};

type PropsHandler<P extends {[key: string]: any}> = (props: P) => P;

export interface ElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {[key: string]: any};
    propsHandler?: (props: {[key: string]: any}) => void;
}

export function defineElementComponent<TagName extends string, ElementType extends CustomElement, Props = CustomElementProps<ElementType>, Events extends {[P in keyof Events]: Event} = any>(tagName: TagName, elementType: AssignableType<ElementType>, props?: Props, events?: Events): CustomElementComponent<TagName, ElementType, Props & CustomElementJSXEvents<ElementType, Events> & Omit<JSX.HTMLAttributes<ElementType>, keyof CustomElementJSXEvents<ElementType, Events>>>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: true, options?: ElementComponentOptions): ElementComponent<TagName, Props & ParentProps, ComponentElement>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: false, options?: ElementComponentOptions): ElementComponent<TagName, Props, ComponentElement>;

export function defineElementComponent(tagName: string, elementTypeOrChildrenAllowed: AssignableType | boolean, options?: ElementComponentOptions | any, events?: any): any {

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

        const extendedType: Type & {reactive: {[propName: string]: boolean | CustomElementReactiveProp}} = solidElementType as any;

        cmp = (rawProps: ParentProps<any>) => {
            register();

            const rawChildren = children(() => rawProps.children);
            const [, reactiveProps, others] = splitProps(rawProps, ["children"], Object.keys(extendedType.reactive ?? {}));

            createRenderEffect(() => {
                const reactiveDescriptors = Object.getOwnPropertyDescriptors(reactiveProps);
                for (const key of Object.keys(reactiveDescriptors)) {
                    const dashed = toDashCase(key);
                    if (key !== dashed) {
                        Object.defineProperty(reactiveProps, dashed, reactiveDescriptors[key]);
                        delete reactiveProps[key];
                    }
                }
            })

            return createMemo(() => {
                const el: any = sharedConfig.context ? getNextElement() : document.createElement(tagName);
                const noShadow = (el as any)["renderRoot"] === el;

                spread(el, mergeProps(reactiveProps, others, {
                    children: (!noShadow && rawChildren()) ?? [],
                    "slotted-children": (noShadow && rawChildren()) ?? []}
                ), false, false);

                // createEffect(() => {
                //     for (const propName of Object.keys(props)) {
                //         const niu = props[propName];
                //         const prev = el[propName];
                //         if (niu !== prev) {
                //             el[propName] = niu;
                //         }
                //     }
                // })
                //
                // spread(el, mergeProps(others, {
                //     children: (!noShadow && rawChildren) ?? [],
                //     "slotted-children": (noShadow && rawChildren.toArray()) ?? []
                // }), false, noShadow);

                return el;
            })
        }

    } else {

        cmp = ((rawProps: any) => {

            register();

            return createMemo(() => {

                const rawChildren = children(() => rawProps.children);
                const [_, others] = splitProps(rawProps, ["children"]);

                const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);

                createRenderEffect(() => {
                    options?.propsHandler?.(others);

                    const descriptors = Object.getOwnPropertyDescriptors(others);
                    for (const key of Object.keys(descriptors)) {
                        const dashed = toDashCase(key);
                        if (dashed !== key) {
                            Object.defineProperty(others, dashed, descriptors[key]);
                            delete others[key];
                        }
                    }
                })

                spread(el, mergeProps(options?.initialProps, others, {children: (elementTypeOrChildrenAllowed && rawChildren) ?? []}), false, !elementTypeOrChildrenAllowed);

                return el;
            })
        })
    }

    cmp["tagName"] = tagName;
    cmp["register"] = register;

    return cmp;
}

function toDashCase(key: string) {

    if (key.includes(":") || key.startsWith("on")) {
        return key;
    }

    return key.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
