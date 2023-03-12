import {
    createElementSignal,
    defineElementComponent,
    CustomElementTemplate,
    getElementSignal, setElementSignal,
    CustomElement, useElementSignal
} from "@appspltfrm/solidx/elements";
import {JSXElement, onCleanup} from "solid-js";

export default defineElementComponent("test-reactivity2", class extends CustomElement {

    protected static readonly reactive = {errors: true}

    errors: any;

    template({props, children}: CustomElementTemplate<this>): JSXElement {
        onCleanup(() => console.log("cleanup2"));
        return <>{props.errors ? props.errors.toString() : "no error"}</>;
    }
})
