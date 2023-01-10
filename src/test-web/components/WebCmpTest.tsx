import {ComponentDefinition, defineComponent, defineEvent, defineProp} from "@appspltfrm/solid-utils/web-components";
import styles from "./WebCmpTest.scss?inline";

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

    readonly events = {

        /**
         * Informuje o zmianach stanu dokonanych przez interakcję w ui.
         */
        onStateChange: defineEvent<CustomEvent<string>>()
    }

}).template((props, {element}) => {
    props.state;
    return <div>State: {props.state}, <span class="extra">Camel</span>: {props.camelCaseProp}</div>;
})

export default WebCmpTest;

declare global {
    interface HTMLElementTagNameMap {
        "web-test": typeof WebCmpTest.elementType
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "web-test": JSX.HTMLAttributes<HTMLAnchorElement>
        }
    }
}

