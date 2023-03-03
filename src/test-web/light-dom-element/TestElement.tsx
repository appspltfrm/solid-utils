import {defineElementComponent, ElementJSXIntrinsic, ElementTemplate, SolidElement} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export class TestLightElement extends SolidElement {

    protected get renderRoot(): this | ShadowRoot {
        return this;
    }

    template({children}: ElementTemplate<this>): JSXElement {
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
            "test-light-element": ElementJSXIntrinsic<TestLightElement>
        }
    }
}
