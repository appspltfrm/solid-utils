import {Fragment} from "solid-js/h/jsx-runtime";
import {Dynamic} from "solid-js/web";
import {
    CustomElement,
    elementComponent,
    ElementJSXIntrinsic,
    ElementTemplate,
    reactive,
    renderRoot
} from "../../elements";
import styles from "./Button.scss?inline";

@renderRoot("shadow", {styles})
export class ButtonElement extends CustomElement {

    @reactive()
    href!: string;

    template({props}: ElementTemplate<ButtonElement>) {

        const tag = props.href ? "a" : "button";

        return <Fragment>
            <Dynamic component={tag}>
                <slot/>
            </Dynamic>
        </Fragment>
    }
}

export const Button = elementComponent("appx-button", ButtonElement);


declare global {
    interface HTMLElementTagNameMap {
        "appx-button": ButtonElement
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "appx-button": ElementJSXIntrinsic<ButtonElement>
        }
    }
}
