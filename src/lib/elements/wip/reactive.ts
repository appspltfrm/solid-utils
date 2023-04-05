import {CustomElementReactivePropMap} from "./CustomeElementReactivePropMap";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";
import {customElementReactiveProps} from "./customElementReactiveProps";
import {isCustomElement} from "./isCustomElement";

export function reactive(options?: CustomElementReactiveProp) {
    return (element: HTMLElement, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        if (isCustomElement(element)) {
            const constructor = element.constructor as any;
            const reactive: CustomElementReactivePropMap = constructor[customElementReactiveProps];
            reactive[propName] = options ?? {};
        }
    }
}
