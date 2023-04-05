import {JSXElement} from "solid-js";
import {CallbackName} from "./CallbackName";
import {customElementCallbacks} from "./customElementCallbacks";
import {customElementChildren} from "./customElementChildren";
import {CustomElementDisconnectedCallback, CustomElementPropertyValueChangeCallback} from "./CustomElementInterface";
import {customElementPreValues} from "./customElementPreValues";

export interface CustomElementInternals {
    [customElementChildren]?: JSXElement;
    [customElementPreValues]?: {[propName: string | symbol]: any};
    [customElementCallbacks]: Array<
        [event: CallbackName.disconnected, callback: CustomElementDisconnectedCallback] |
        [event: CallbackName.propertyValueChange, callback: CustomElementPropertyValueChangeCallback]>;
}
