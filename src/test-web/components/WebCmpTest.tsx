import {
    CustomHTMLElement,
    defineComponent,
    defineElement,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive
} from "@appspltfrm/solid-utils/web-components";
import {Fragment} from "solid-js/h/jsx-runtime";

@defineElement("web-test")
class WebCmpTestElement extends CustomHTMLElement {

    /**
     * jakiś komentarz
     */
    @reactive()
    state?: string;

    @reactive()
    camelCaseProp?: string;

    get renderRoot() {
        return this;
    }

    template({props}: ElementTemplate<WebCmpTestElement>) {
        return <Fragment>
            <span>{props.state} {props.camelCaseProp}</span>
        </Fragment>;
    }

    addEventListener<K extends keyof WebCmpTestEvents>(type: K, listener: (this: WebCmpTestElement, ev: WebCmpTestEvents[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        return super.addEventListener(type, listener, options);
    }

    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        return super.removeEventListener(type, listener, options);
    }
}

interface WebCmpTestEvents extends HTMLElementEventMap {
    stateChange: CustomEvent<string>;
}

export const WebCmpTest = defineComponent(WebCmpTestElement)
    .events<WebCmpTestEvents>()
    .required("state");

export default WebCmpTest;

declare global {
    interface HTMLElementTagNameMap {
        "web-test": WebCmpTestElement
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "web-test": ElementJSXIntrinsic<WebCmpTestElement, WebCmpTestEvents>
        }
    }
}

