import {
    SolidElement,
    elementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive, renderRoot
} from "@appspltfrm/solidx/elements";
import styles from "./TestElement.scss?inline";

export const TestNoDecorator = elementComponent("test-element-no-decorator", class Test extends SolidElement {

    protected static readonly reactive = {test: true}

    test!: string;

    protected template({props, children}: ElementTemplate<Test>) {
        return <>{props.test}</>
    }

    protected get renderRoot() {
        return this;
    }
});

export default TestNoDecorator;
