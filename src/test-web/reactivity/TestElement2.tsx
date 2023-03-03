import {
    createElementSignal,
    defineElementComponent,
    ElementTemplate,
    getElementSignal, setElementSignal,
    SolidElement, useElementSignal
} from "@appspltfrm/solidx/elements";
import {JSXElement, onCleanup} from "solid-js";

export default defineElementComponent("test-reactivity2", class extends SolidElement {

    protected static readonly reactive = {errors: true}

    errors: any;

    template({props, children}: ElementTemplate<this>): JSXElement {
        onCleanup(() => console.log("cleanup2"));
        return <>{props.errors ? props.errors.toString() : "no error"}</>;
    }
})
