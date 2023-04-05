import {CustomElement, CustomElementTemplate, defineElementComponent} from "@appspltfrm/solidx/elements";
import {JSXElement, onCleanup} from "solid-js";

export default defineElementComponent("test-reactivity2", class extends CustomElement({reactive: {errors: true}}) {

    errors: any;

    template({children}: CustomElementTemplate): JSXElement {
        onCleanup(() => console.log("cleanup2"));
        return <>{this.errors ? this.errors.toString() : "no error"}</>;
    }
})
