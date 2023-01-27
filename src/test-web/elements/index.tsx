import {Fragment} from "solid-js/h/jsx-runtime";
import Test, {TestElement} from "./TestElement";

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Test custom element</legend>
            <test-element state="test" attr:argh="true" camel-case-prop="sdsd"/>
        </fieldset>

        <fieldset>
            <legend>Test element component</legend>
            <Test state="true" onStateChange={(ev) => console.log(ev)} on:statechange={(ev) => console.log("args", ev)} attr:arg="test"/>
            <button on:click={(ev) => (ev.target as HTMLElement).previousElementSibling?.dispatchEvent(new CustomEvent("statechange"))}></button>
        </fieldset>

    </Fragment>
}
