import {
    CustomElement,
    defineElementComponent,
    CustomElementJSXIntrinsic,
    CustomElementTemplate,
    reactive, renderRoot
} from "@appspltfrm/solidx/elements";
import {onCleanup} from "solid-js";
import styles from "./TestElement.scss?inline";

export const TestNoDecorator = defineElementComponent("test-element-no-decorator", class Test extends CustomElement {

    protected static readonly reactive = {test: true}

    test!: string;

    testAProp?: string;

    protected template({props, children}: CustomElementTemplate<Test>) {
        onCleanup(() => console.log("cleanup"))
        return <>{props.test} | {props.testAProp}</>
    }
});

export default TestNoDecorator;
