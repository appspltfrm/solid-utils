import {
    CustomElement,
    elementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive
} from "@appspltfrm/solidx/elements";
import styles from "./TestElement.scss?inline";

export interface TestElementProps {

    /**
     * state
     */
    state: string;
    camelCaseProp?: string;

    /**
     * jakiś komentarz
     */
    stateProvider?: () => string;
}

class TestElement extends CustomElement implements TestElementProps {

    @reactive()
    state!: string;

    @reactive()
    camelCaseProp?: string;

    @reactive()
    stateProvider?: () => string;

    private test?: string;

    template({props}: ElementTemplate<TestElement>) {
        return <>
            <style>{styles}</style>
            <span class="extra">{props.state} {props.camelCaseProp}</span>
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
    stateChange: CustomEvent<string>;
}

export const Test = elementComponent("test-element", TestElement).configure<TestElementProps, TestElementEventMap>();

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
