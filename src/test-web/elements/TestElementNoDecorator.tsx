import {
    SolidElement,
    defineElementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive, renderRoot
} from "@appspltfrm/solidx/elements";
import styles from "./TestElement.scss?inline";

export const TestNoDecorator = defineElementComponent("test-element-no-decorator", class Test extends SolidElement {

    protected static readonly reactive = {test: true}

    test!: string;

    protected get renderRoot() {
        return this;
    }

    protected template({props, children}: ElementTemplate<Test>) {
        return <>{props.test}</>
    }
});

export default TestNoDecorator;
