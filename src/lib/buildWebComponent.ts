import {Component} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";

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

    #props: {[P in keyof Props]?: PropDefinition<any> | undefined} = {};

    prop<P extends keyof Props>(name: P, config?: PropDefinition<P>): this {
        this.#props[name] = config ?? undefined;
        return this;
    }

    #baseElement!: typeof HTMLElement;

    baseElement<T extends typeof HTMLElement>(base: T): this {
        this.#baseElement = base;
        return this;
    }

    #template!: Component<Props>;

    template(impl: ((props?: Props) => JSX.Element)): this {
        this.#template = impl;
        return this;
    }

    build(): Component & {tagName: TagName} {
        const cmp = (props: any) => {
            return this.#template(props);
        }

        cmp["tagName"] = this.tagName;

        return cmp;
    }
}

export function buildWebComponent<Props extends BaseProps>(tagName: string) {
    return new WebComponentBuilder<Props, typeof tagName>(tagName);
}
