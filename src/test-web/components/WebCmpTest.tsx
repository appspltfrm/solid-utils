import {defineProp, defineComponent, ComponentDefinition, ComponentElement} from "@appspltfrm/solid-utils/web-components";
import styles from "./WebCmpTest.scss?inline";

export interface WebCmpTestEvents {
    /**
     * test
     * @param ev
     * @returns 
     */
    onStateChange: (ev: CustomEvent<string>) => void;
}

export const WebCmpTest = defineComponent(class extends ComponentDefinition {
    readonly tagName = "web-test";
    readonly baseElement = HTMLAnchorElement;
    readonly shadow = true;
    readonly styles = styles;

    readonly props = {
        /**
         * jakiś komentarz
         */
        state: defineProp<string, true>(),
        camelCaseProp: defineProp<string>()
    }

    declare events: WebCmpTestEvents;
}).template((props, {element}) => {
    props.state;
    return <div>State: {props.state}, <span class="extra">Camel</span>: {props.camelCaseProp}</div>;
})

export default WebCmpTest;

declare global {
    interface HTMLElementTagNameMap {
        "web-test": ComponentElement<HTMLAnchorElement, WebCmpTestProps, WebCmpTestEvents>
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "web-test": WebCmpTestProps & JSX.HTMLAttributes<HTMLAnchorElement>
        }
    }
}

