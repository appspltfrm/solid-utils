import {webComponent, WebComponentDefinition, WebComponentElement} from "@appspltfrm/solid-utils/web-components";
import styles from "./WebCmpTest.scss?inline";

export interface WebCmpTestProps {
    state: string;
    camelCaseProp?: string;
}

export interface WebCmpTestEvents {
    onStateChange: (ev: CustomEvent<string>) => void;
}

export const WebCmpTest = webComponent(class extends WebComponentDefinition {
    readonly tagName = "web-test";
    readonly baseElement = HTMLAnchorElement;
    readonly shadow = true;
    readonly styles = styles;
    declare props: WebCmpTestProps;
    declare events: WebCmpTestEvents;
}).props("state", "camelCaseProp").template((props, {element}) => {
    return <div class="extra">{props.state}zajebiście {props.camelCaseProp} web cmp hello</div>;
})

declare global {
    interface HTMLElementTagNameMap {
        "web-test": WebComponentElement<HTMLAnchorElement, WebCmpTestProps, WebCmpTestEvents>
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "web-test": WebCmpTestProps & JSX.HTMLAttributes<HTMLAnchorElement>
        }
    }
}

