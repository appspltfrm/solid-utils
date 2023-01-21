import {Fragment} from "solid-js/h/jsx-runtime";
import Test from "./TestElement";

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Test custom element</legend>
            <test-element state="missing validation"/>
        </fieldset>

        <fieldset>
            <legend>Test element component</legend>
            <Test state="yahooo"/>
        </fieldset>

    </Fragment>
}
