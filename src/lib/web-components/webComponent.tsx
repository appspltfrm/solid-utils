import {AssignableType} from "@co.mmons/js-utils/core";
import {PropsDefinitionInput} from "component-register";
import {customElement, getCurrentElement, noShadowDOM} from "solid-element";
import {Component, ParentProps, splitProps} from "solid-js";
import {Fragment, JSX} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {fixPropNames} from "./fixPropNames";
import {WebComponentDefinition} from "./WebComponentDefinition";
import {WebComponentElement} from "./WebComponentElement";

interface PropDefinition<T> {
    value?: T;
    attribute?: string;
    notify?: boolean;
    reflect?: boolean;
    parse?: boolean;
}

export function webComponent<Definition extends AssignableType<WebComponentDefinition>>(cl: Definition) {

    const instance = new cl;
    type Props = Definition["prototype"]["props"];
    type Events = Definition["prototype"]["events"];
    type BaseElement = Definition["prototype"]["baseElement"]["prototype"];
    type Element = WebComponentElement<BaseElement, Props, Events>;
    type TagName = Definition["prototype"]["tagName"];
    type Addons = {element: Element};

    type SolidComponent = Component<JSX.HTMLAttributes<BaseElement> & Props & Partial<Events>> & {
        tagName: TagName,
        props(...allProps: ((keyof Props) | {[propName in keyof Props]: PropDefinition<Props>})[]): SolidComponent,
        template(template: ((props: Props, addons: Addons) => JSX.Element)): SolidComponent
    }

    const solidComponentImpl: Component<Props & Events> = (rawProps) => {
        const [, props, other] = splitProps(rawProps, ["children"], [])
        return <Dynamic component={instance.tagName as any} {...fixPropNames(props)} {...other}/>
    }

    const solidComponent: SolidComponent = solidComponentImpl as any;
    solidComponent.tagName = instance.tagName;

    const propsDefinitions: PropsDefinitionInput<Props> = {} as any;

    solidComponent.props = (...allProps: (string | {[propName in keyof Props]: PropDefinition<Props>})[]) => {

        for (const prop of allProps) {
            for (const [propName, propDef] of Object.entries(typeof prop === "string" ? {[prop]: {}} : prop)) {
                propsDefinitions[propName as keyof Props] = Object.assign({reflect: false, attribute: "", notify: false, parse: false, value: undefined}, propDef)
            }
        }

        return solidComponent;
    }

    solidComponent.template = (template: ((props: Props, addons: Addons) => JSX.Element)) => {

        const shadow = instance.shadow;
        const styles = (Array.isArray(instance.styles) && instance.styles) || (typeof instance.styles === "string" && [instance.styles]) || undefined;

        customElement(instance.tagName, propsDefinitions, (props: Definition["prototype"]["props"]) => {

            if (!shadow) {
                noShadowDOM();
            }

            const addons = {
                element: getCurrentElement() as any,
                Host: (props: ParentProps<JSX.HTMLAttributes<Element>>) => {
                    const element = getCurrentElement();
                    const [, other] = splitProps(props, ["children"])
                    for (const [propName, value] of Object.entries(other)) {
                        element.setAttribute(propName, value);
                    }

                    return props.children;
                }
            }

            return <Fragment>
                {shadow && styles?.map(s => <style>{s}</style>)}
                {template(props, addons)}
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
