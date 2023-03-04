import {
    defineElementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive,
    renderRoot,
    SolidElement
} from "@appspltfrm/solidx/elements";
import {createEffect, onCleanup} from "solid-js";
import styles from "./TestElement.scss?inline";

export interface TestElementProps {

    /**
     * state
     */
    state: any;
    items?: string[];
    camelCaseProp?: string;

    /**
     * jakiś komentarz
     */
    stateProvider?: () => string;

    readonly?: boolean;
}

@renderRoot("element")
export class TestElement extends SolidElement implements TestElementProps {

    @reactive()
    state!: any;

    @reactive()
    items?: string[];

    @reactive()
    camelCaseProp?: string;

    @reactive()
    readonly?: boolean;

    @reactive()
    stateProvider?: () => string;

    private test?: string;

    protected template({props, children}: ElementTemplate<TestElement>) {

        onCleanup(() => console.log("cleanup"))

        createEffect(() => console.log("shit:" + props.state))

        return <>
            <style>{styles}</style>
            <div>state: {props.state}</div>
            <div>readonly: {typeof props.readonly}</div>
            <span class="extra">{props.state} {props.camelCaseProp}</span>
            {children}

            <div>{props.items?.join(", ")}</div>
        </>
    }

    addEventListener<K extends keyof TestElementEventMap>(type: K, listener: (this: TestElement, ev: TestElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        return super.addEventListener(type, listener, options);
    }

    removeEventListener<K extends keyof TestElementEventMap>(type: K, listener: (this: TestElement, ev: TestElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        return super.removeEventListener(type, listener, options);
    }
}

interface TestElementEventMap extends HTMLElementEventMap {
    stateChange: CustomEvent<any>;
}

export const Test = defineElementComponent("test-element", TestElement, {} as TestElementProps, {} as TestElementEventMap);

export default Test;

declare global {
    interface HTMLElementTagNameMap {
        "test-element": TestElement
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "test-element": ElementJSXIntrinsic<TestElement, TestElementProps, TestElementEventMap>
        }
    }
}
