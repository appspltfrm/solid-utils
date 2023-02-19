import {
    createElementSignal,
    elementComponent,
    ElementTemplate,
    getElementSignal, setElementSignal,
    SolidElement, useElementSignal
} from "@appspltfrm/solidx/elements";
import {JSXElement} from "solid-js";

export default elementComponent("test-vars-element", class extends SolidElement {

    protected testVars() {
        setElementSignal<number>(this, "test", (prev) => (prev || 0) + 1)
    }

    template({children}: ElementTemplate<this>): JSXElement {

        const [test] = createElementSignal(this, "test", undefined);

        return <>
            <button onClick={() => this.testVars()}>test {useElementSignal(this, "test")}</button>
            <slot/>
        </>;
    }
})
