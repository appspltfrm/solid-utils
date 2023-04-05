import {CustomElement, CustomElementTemplate, reactive} from "@appspltfrm/solidx/elements/wip";

export class TestElement extends CustomElement({reactive: {otherProp: true}}) {

    @reactive({type: Number})
    someProp?: number;

    otherProp?: number = 123;

    template({children}: CustomElementTemplate) {
        return <div>
            <div>{this.someProp}</div>
            <div>children:</div>
            {children}
        </div>
    }
}
