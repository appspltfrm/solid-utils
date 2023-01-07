import {customElement} from "solid-element";
import {Component, splitProps} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";
import {PropsDefinitionInput} from "component-register";
import {Dynamic} from "solid-js/web";

type BaseProps = {[key: string]: any};

interface PropDefinition<T> {
    value?: T;
    attribute?: string;
    notify?: boolean;
    reflect?: boolean;
    parse?: boolean;
}

export class WebComponentBuilder<Props extends BaseProps, TagName extends string> {
    constructor(private readonly tagName: TagName) {
    }

    #props: PropsDefinitionInput<Props> = {} as any;

    prop<P extends keyof Props>(name: P, config?: PropDefinition<P>): this {
        this.#props[name] = config ?? undefined as any;
        return this;
    }

    #baseElement!: typeof HTMLElement;

    baseElement<T extends typeof HTMLElement>(base: T): this {
        this.#baseElement = base;
        return this;
    }

    #template!: Component<Props>;

    template(impl: ((props: Props) => JSX.Element)): this {
        this.#template = impl;
        return this;
    }

    build(): Component<Props> & {tagName: TagName} {

        customElement(this.tagName, this.#props, (props) => this.#template(props));

        const cmp = (_props: any) => {
            const [, props, other] = splitProps(_props, ["children"], Object.keys(this.#props))
            return <Dynamic component={this.tagName as any} {...this.fixPropNames(props)} {...other}/>
        }

        cmp["tagName"] = this.tagName;

        return cmp;
    }

    private fixPropNames<T extends {[key: string]: any}>(props: T): T {
        const niu: any = {};

        for (const [k, v] of Object.entries(props)) {
            niu[k.toLowerCase().replace(/(-)([a-z])/g, test => test.toUpperCase().replace("-", ""))] = v;
        }

        return niu;
    }
}

export function buildWebComponent<Props extends BaseProps>(tagName: string) {
    return new WebComponentBuilder<Props, typeof tagName>(tagName);
}
