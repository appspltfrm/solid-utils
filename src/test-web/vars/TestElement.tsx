import {
    elementComponent,
    ElementTemplate,
    getElementSignal,
    loadElementSignal,
    SolidElement
} from "@appspltfrm/solidx/elements";
import {sleep} from "@co.mmons/js-utils/core";
import {combineLatest, from, of} from "rxjs";
import {JSXElement} from "solid-js";

export default elementComponent("test-vars-element", class extends SolidElement {

    protected testVars() {
        const test = getElementSignal(this, "test")!;
    }

    template({children}: ElementTemplate<this>): JSXElement {

        loadElementSignal(this, "test", combineLatest([of(1), from(new Promise(async (resolve) => {
            await sleep(1000);
            resolve(2);
        }))]))

        return <>
            <button onClick={() => this.testVars()}>test {getElementSignal(this, "test")!()}</button>
            <slot/>
        </>;
    }
})
