import {CustomElement, CustomElementTemplate, defineComponent} from "@appspltfrm/solidx/elements";
import {onCleanup} from "solid-js";

export const TestNoDecorator = defineComponent("test-element-no-decorator", class extends CustomElement({
    reactive: {test: true, testAProp: true}
}) {

    test!: string;

    testAProp?: string;

    template({children}: CustomElementTemplate) {
        onCleanup(() => console.log("cleanup"))
        return <>{this.test} | {this.testAProp}</>
    }
});

export default TestNoDecorator;
