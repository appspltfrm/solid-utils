import {Fragment} from "solid-js/h/jsx-runtime";
import Test from "./TestElement";

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Test custom element</legend>
            <test-element state="test" camel-case-prop="sdsd"/>
        </fieldset>

        <fieldset>
            <legend>Test element component</legend>
            <Test state="te" attr:dupa-zbita="test"/>
        </fieldset>

    </Fragment>
}
