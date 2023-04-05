import {CustomElementReactivePropMap} from "./CustomeElementReactivePropMap";
import {CustomElementReactivePropConfig} from "./CustomElementReactivePropConfig";
import {reactivePropsProp} from "./internals/reactivePropsProp";
import {isCustomElement} from "./isCustomElement";

export function reactive(options?: CustomElementReactivePropConfig) {
    return (element: HTMLElement, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        if (isCustomElement(element)) {
            const constructor = element.constructor as any;
            const reactive: CustomElementReactivePropMap = constructor[reactivePropsProp];
            reactive[propName] = options ?? {};
        }
    }
}
