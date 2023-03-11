import {createSignal, Show} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import Test, {TestElement} from "./TestElement";
import TestNoDecorator from "./TestElementNoDecorator";
import {TestShadow} from "./TestShadowElement";

export default function() {

    const [state, setState] = createSignal("a")
    const [items, setItems] = createSignal(["a", "b", "c"]);
    const [test, setTest] = createSignal(false);

    setTimeout(() => setTest(true), 1000);

    return <Fragment>

        {test() && <div>just added</div>}

        <Test state={state()} items={items()} readonly={true}>
            <span>jakiś test</span>
        </Test>

        <button onClick={(ev) => setItems(["1", "2", "3"])}>change items</button>
        <button onClick={(ev) => setState("b")}>change state</button>

        <Show when={false}>
            <fieldset>
                <legend>Test custom element</legend>
                <test-element readonly={true} state="test" attr:argh="true" camel-case-prop="sdsd"/>
            </fieldset>

            <fieldset>
                <legend>Test element component</legend>
                <Test state={state()} items={items()} readonly={true} onStateChange={(ev) => console.log(ev)} on:statechange={(ev) => console.log("args", ev)}>
                    <span>jakiś test</span>
                </Test>
            </fieldset>

            <fieldset>
                <legend>Test element no decorator</legend>
                <TestNoDecorator test="false"/>

                <Dynamic component={TestNoDecorator} test="false" test-some-id="yes"/>
            </fieldset>

            <fieldset>
                <legend>Test shadow</legend>
                <TestShadow>ulalla</TestShadow>
            </fieldset>
        </Show>

    </Fragment>
}
