import {
    createElementSignal,
    CustomElement,
    CustomElementTemplate,
    defineElementComponent,
    getElementSignal,
    setElementSignal
} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export default defineElementComponent("test-vars-element", class extends CustomElement() {

    protected testVars() {
        setElementSignal<number>(this, "test", (prev) => (prev || 0) + 1)
    }

    template({children}: CustomElementTemplate): JSXElement {

        const [test] = createElementSignal(this, "test", undefined);

        return <>
            <button onClick={() => this.testVars()}>test {getElementSignal(this, "test")}</button>
            <slot/>
        </>;
    }
})
