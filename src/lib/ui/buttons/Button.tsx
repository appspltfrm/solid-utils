import {HtmlString} from "@co.mmons/js-utils/core";
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
import {innerProp} from "../../utils/innerProp";
import styles from "./Button.scss?inline";

@renderRoot("shadow", {styles})
export class ButtonElement extends CustomElement {

    @reactive()
    href?: string;

    @reactive()
    text?: string | HtmlString;

    template({props}: ElementTemplate<ButtonElement>) {

        const tag = props.href ? "a" : "button";
        const {text} = props;

        return <Dynamic component={tag}>
            <slot>
                {text && <label {...innerProp(text)}/>}
            </slot>
        </Dynamic>
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
