import {SolidElement, ElementTemplate, defineElementComponent} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export class TestShadowElement extends SolidElement {

    template({children}: ElementTemplate<this>): JSXElement {
        return <slot/>;
    }
}

export const TestShadow = defineElementComponent("test-shadow", TestShadowElement);
