import {buildWebComponent, WebComponentDefinition, WebComponentElement} from "@appspltfrm/solid-utils";
import styles from "./WebCmpTest.scss?inline";

export interface WebCmpTestProps {
    state: string;
}

export interface WebCmpTestEvents {
    onStateChange: (ev: CustomEvent<string>) => void;
}

export const WebCmpTest = buildWebComponent(class extends WebComponentDefinition {
    readonly tagName = "web-test";
    readonly baseElement = HTMLAnchorElement;
    readonly shadow = true;
    readonly styles = styles;
    declare props: WebCmpTestProps;
    declare events: WebCmpTestEvents;
}).props("state").template((props, {element}) => {
    return <div class="extra">{props.state}zajebiście web cmp hello</div>
})

declare global {
    interface HTMLElementTagNameMap {
        "web-test": WebComponentElement<HTMLAnchorElement, WebCmpTestProps, WebCmpTestEvents>
    }
}
