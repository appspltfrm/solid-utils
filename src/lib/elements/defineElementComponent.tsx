import {AssignableType, Type} from "@co.mmons/js-utils/core";
import type {JSX, ParentProps} from "solid-js";
import {children, Component, createMemo, mergeProps, sharedConfig, splitProps} from "solid-js";
import {getNextElement, spread} from "solid-js/web";
import {CustomElement} from "./CustomElement";
import {CustomElementJSXAttributes} from "./CustomElementJSXAttributes";
import {CustomElementJSXEvents} from "./CustomElementJSXEvents";
import {CustomElementProps} from "./CustomElementProps";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";
import {registerElement} from "./registerElement";

type DefineElementFn = () => void;

export type CustomElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = CustomElementProps<ElementType>> = Component<ComponentProps & CustomElementJSXAttributes> & {
    tagName: TagName;
    register(): void
}

export interface CustomElementComponentOptions<Props = any, Events = any> {
    props?: Props,
    events?: Events
}

export type ElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {tagName: TagName, register: () => void};

export interface ElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {[key: string]: any};
    propsHandler?: (props: {[key: string]: any}) => void;
}

export function defineElementComponent<TagName extends string, ElementType extends CustomElement, Props = CustomElementProps<ElementType>, Events extends {[P in keyof Events]: Event} = any>(tagName: TagName, elementType: AssignableType<ElementType>, options?: CustomElementComponentOptions<Props, Events>): CustomElementComponent<TagName, ElementType, Props & CustomElementJSXEvents<ElementType, Events> & Omit<JSX.HTMLAttributes<ElementType>, keyof CustomElementJSXEvents<ElementType, Events>>>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, elementType: ComponentElement, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;

export function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;

export function defineElementComponent(tagName: string, elementTypeOrOptions?: AssignableType | ElementComponentOptions, componentOptions?: ElementComponentOptions | CustomElementComponentOptions): any {

    const solidElementType = typeof elementTypeOrOptions === "function" && elementTypeOrOptions as AssignableType;
    const options: Partial<ElementComponentOptions & CustomElementComponentOptions> | undefined = typeof elementTypeOrOptions === "object" ? elementTypeOrOptions as ElementComponentOptions : componentOptions;

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
            const [, uncheckedProps] = splitProps(rawProps, ["children"]);

            const props = createMemo(() => {
                const clone = {};
                const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
                for (const key of Object.keys(descriptors)) {
                    const fixed = extendedType.reactive?.[key] ? `prop:${key}` : fixPropName(key);
                    Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
                }
                return clone;
            })

            return createMemo(() => {
                const el: any = sharedConfig.context ? getNextElement() : document.createElement(tagName);
                const noShadow = (el as any)["renderRoot"] === el;
                const childrenProp = noShadow ? "prop:slottedChildren" : "children";

                spread(el, mergeProps(props, {[childrenProp]: rawChildren}), false, false);

                return el;
            })
        }

    } else {

        cmp = ((rawProps: any) => {

            register();

            return createMemo(() => {

                const rawChildren = children(() => rawProps.children);
                const [_, uncheckedProps] = splitProps(rawProps, ["children"]);

                const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);

                const props = createMemo(() => {
                    const clone = {};
                    const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
                    for (const key of Object.keys(descriptors)) {
                        const fixed = fixPropName(key);
                        Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
                    }

                    options?.propsHandler?.(clone);

                    return clone;
                })

                spread(el, mergeProps(options?.initialProps, props, {children: rawChildren ?? []}), false, true);

                return el;
            })
        })
    }

    cmp["tagName"] = tagName;
    cmp["register"] = register;

    return cmp;
}

const notFixableProps = ["class", "className", "classList", "ref", "style"];

function fixPropName(key: string) {

    if (key.includes(":") || key.startsWith("on") || notFixableProps.includes(key)) {
        return key;
    } else if (key.includes("-")) {
        return `attr:${key}`;
    } else {
        return `prop:${key}`;
    }
}
