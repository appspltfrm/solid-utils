import {
    CustomElement,
    elementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive
} from "@appspltfrm/solidx/elements";
import {Fragment} from "solid-js/h/jsx-runtime";
import styles from "./TestElement.scss?inline";

class TestElement extends CustomElement {

    /**
     * jakiś komentarz
     */
    @reactive()
    state?: string;

    @reactive()
    camelCaseProp?: string;

    template({props}: ElementTemplate<TestElement>) {
        return <Fragment>
            <style>{styles}</style>
            <span class="extra">{props.state} {props.camelCaseProp}</span>
        </Fragment>;
    }

    connectedCallback() {
        console.log(this.state)
        console.log("connected")
    }

    disconnectedCallback() {
        console.log("disconnected")
    }

    addEventListener<K extends keyof TestElementEventMap>(type: K, listener: (this: TestElement, ev: TestElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        return super.addEventListener(type, listener, options);
    }

    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        return super.removeEventListener(type, listener, options);
    }
}

interface TestElementEventMap extends HTMLElementEventMap {
    stateChange: CustomEvent<string>;
}

export const Test = elementComponent("test-element", TestElement)
    .events<TestElementEventMap>()
    .required("state")

export default Test;

declare global {
    interface HTMLElementTagNameMap {
        "test-element": TestElement
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "test-element": ElementJSXIntrinsic<TestElement, TestElementEventMap>
        }
    }
}

