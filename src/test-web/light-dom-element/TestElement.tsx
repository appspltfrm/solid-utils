import {
    CustomElement,
    CustomElementJSXIntrinsic,
    CustomElementTemplate,
    defineElementComponent
} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export class TestLightElement extends CustomElement({renderRoot: "element"}) {

    template({children}: CustomElementTemplate): JSXElement {
        return <>{children}</>;
    }
}

export const Test = defineElementComponent("test-light-element", TestLightElement);

declare global {
    interface HTMLElementTagNameMap {
        "test-light-element": TestLightElement;
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "test-light-element": CustomElementJSXIntrinsic<TestLightElement>
        }
    }
}
