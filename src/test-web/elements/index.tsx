import {Fragment} from "solid-js/h/jsx-runtime";
import Test from "./TestElement";
import TestNoDecorator from "./TestElementNoDecorator";
import {TestShadow} from "./TestShadowElement";

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Test custom element</legend>
            <test-element state="test" attr:argh="true" camel-case-prop="sdsd"/>
        </fieldset>

        <fieldset>
            <legend>Test element component</legend>
            <Test state="true" onStateChange={(ev) => console.log(ev)} on:statechange={(ev) => console.log("args", ev)} attr:arg="test">
                <span>jakiś test</span>
            </Test>
            <button on:click={(ev) => (ev.target as HTMLElement).previousElementSibling?.dispatchEvent(new CustomEvent("statechange"))}></button>
        </fieldset>

        <fieldset>
            <legend>Test element no decorator</legend>
            <TestNoDecorator test="false"/>
        </fieldset>

        <fieldset>
            <legend>Test shadow</legend>
            <TestShadow>ulalla</TestShadow>
        </fieldset>

    </Fragment>
}
