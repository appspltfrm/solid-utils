import {
    CustomHTMLElement,
    defineElement,
    ElementAttributes,
    ElementProps,
    reactive
} from "@appspltfrm/solid-utils/web-components";
import {defineComponent} from "@appspltfrm/solid-utils/web-components/defineComponent";

@defineElement("web-test")
class WebCmpTestElement extends CustomHTMLElement {

    /**
     * jakiś komentarz
     */
    @reactive()
    state?: string;

    @reactive()
    camelCaseProp?: string;

    template(props: ElementProps<WebCmpTestElement>) {
        return <span>{props.state} {props.camelCaseProp}</span>;
    }
}

interface WebCmpTestEvents {
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
            "web-test": ElementAttributes<WebCmpTestElement>
        }
    }
}

