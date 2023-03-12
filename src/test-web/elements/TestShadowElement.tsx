import {CustomElement, CustomElementTemplate, defineElementComponent} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export class TestShadowElement extends CustomElement {

    template({children}: CustomElementTemplate<this>): JSXElement {
        return <slot/>;
    }
}

export const TestShadow = defineElementComponent("test-shadow", TestShadowElement);
