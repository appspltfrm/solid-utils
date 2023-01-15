import {registerElement} from "../registerElement";

export function customElement(tagName: string) {
    return function(elementConstructor: any) {
        registerElement(tagName, elementConstructor);
    }
}
