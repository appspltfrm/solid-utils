import {AssignableType} from "@co.mmons/js-utils/core";
import {customElement, getCurrentElement, noShadowDOM} from "solid-element";
import {Component, splitProps} from "solid-js";
import {Fragment, JSX} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {PropsDefinitionInput} from "component-register";

interface PropDefinition<T> {
    value?: T;
    attribute?: string;
    notify?: boolean;
    reflect?: boolean;
    parse?: boolean;
}

function fixPropNames<T extends {[key: string]: any}>(props: T): T {
    const niu: any = {};

    for (const [k, v] of Object.entries(props)) {
        niu[k.toLowerCase().replace(/(-)([a-z])/g, test => test.toUpperCase().replace("-", ""))] = v;
    }

    return niu;
}

export type WebComponentEvents<K extends keyof any = any, T extends Event = Event> = {[P in K]: (ev?: T) => void};
export type WebComponentElement<BaseType extends HTMLElement, Props = {}, Events = {}> = BaseType & Props;

export abstract class WebComponentDefinition {
    abstract readonly tagName: string;
    readonly shadow?: boolean;
    readonly styles?: string | string[];
    readonly baseElement?: typeof HTMLElement;
    readonly props?: {};
    readonly events?: {};
}

export function buildWebComponent<Definition extends AssignableType<WebComponentDefinition>>(cl: Definition) {

    const instance = new cl;
    type Props = Definition["prototype"]["props"];
    type Events = Definition["prototype"]["events"];
    type Element = WebComponentElement<Definition["prototype"]["baseElement"]["prototype"], Props, Events>;
    type TagName = Definition["prototype"]["tagName"];

    const propsDefinitions: PropsDefinitionInput<Props> = {} as any;

    type SolidComponent = Component<Props & Events> & {
        tagName: TagName,
        props(...allProps: (string | {[propName in keyof Props]: PropDefinition<Props>})[]): SolidComponent,
        template(template: ((props: Props, addons: {element: Element}) => JSX.Element)): SolidComponent
    }

    const solidComponentImpl: Component<Props & Events> = (rawProps) => {
        const [, props, other] = splitProps(rawProps, ["children"], [])
        return <Dynamic component={instance.tagName as any} {...fixPropNames(props)} {...other}/>
    }

    const solidComponent: SolidComponent = solidComponentImpl as any;
    solidComponent.tagName = instance.tagName;
    solidComponent.props = (...allProps: (string | {[propName in keyof Props]: PropDefinition<Props>})[]) => {

        for (const prop of allProps) {
            for (const [propName, propDef] of Object.entries(typeof prop === "string" ? {[prop]: {}} : prop)) {
                propsDefinitions[propName as keyof Props] = Object.assign({reflect: false, attribute: "", notify: false, parse: false, value: undefined}, propDef)
            }
        }

        return solidComponent;
    }

    solidComponent.template = (template: ((props: Props, addons: {element: Element}) => JSX.Element)) => {

        const shadow = instance.shadow;
        const styles = (Array.isArray(instance.styles) && instance.styles) || (typeof instance.styles === "string" && [instance.styles]) || undefined;

        customElement(instance.tagName, propsDefinitions, (props: Definition["prototype"]["props"]) => {

            if (!shadow) {
                noShadowDOM();
            }

            return <Fragment>
                {shadow && styles?.map(s => <style>{s}</style>)}
                {template(props, {element: getCurrentElement() as any})}
            </Fragment>
        });

        return solidComponent;
    }

    return solidComponent;
    //
    //
    // return new class {
    //     tagName: TagName = instance.tagName;
    //
    //     props(...allProps: (string | {[propName in keyof Props]: PropDefinition<Props>})[]): this {
    //
    //         for (const prop of allProps) {
    //             for (const [propName, propDef] of Object.entries(typeof prop === "string" ? {[prop]: {}} : prop)) {
    //                 propsDefinitions[propName as keyof Props] = Object.assign({reflect: false, attribute: "", notify: false, parse: false, value: undefined}, propDef)
    //             }
    //         }
    //
    //         return this;
    //     }
    //
    //     template(template: ((props: Props, addons: {element: Element}) => JSX.Element)): Component<Props & Events> & {tagName: TagName} {
    //
    //         const shadow = instance.shadow;
    //         const styles = (Array.isArray(instance.styles) && instance.styles) || (typeof instance.styles === "string" && [instance.styles]) || undefined;
    //
    //         customElement(instance.tagName, propsDefinitions, (props: Definition["prototype"]["props"]) => {
    //
    //             if (!shadow) {
    //                 noShadowDOM();
    //             }
    //
    //             return <Fragment>
    //                 {shadow && styles?.map(s => <style>{s}</style>)}
    //                 {template(props, {element: getCurrentElement() as any})}
    //             </Fragment>
    //         });
    //
    //         const cmp = (_props: any) => {
    //             const [, props, other] = splitProps(_props, ["children"], [])
    //             return <Dynamic component={this.tagName as any} {...fixPropNames(props)} {...other}/>
    //         }
    //
    //         cmp["tagName"] = this.tagName;
    //
    //         return cmp;
    //     }
    //}
}
