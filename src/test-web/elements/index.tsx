import {Fragment} from "solid-js/h/jsx-runtime";
import Test, {TestElement} from "./TestElement";
import TestNoDecorator from "./TestElementNoDecorator";
import {TestShadow} from "./TestShadowElement";

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Test custom element</legend>
            <test-element readonly={true} state="test" attr:argh="true" camel-case-prop="sdsd"/>
        </fieldset>

        <fieldset>
            <legend>Test element component</legend>
            <Test state={["a"]} readonly={true} onStateChange={(ev) => console.log(ev)} on:statechange={(ev) => console.log("args", ev)} attr:arg="test">
                <span>jakiś test</span>
            </Test>
            <button onClick={(ev) => (((ev.target as HTMLElement).previousElementSibling as TestElement).readonly = undefined)}>change readonly</button>
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
