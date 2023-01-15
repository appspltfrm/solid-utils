import { registerElement } from "../registerElement";
export function customElement(tagName) {
    return function (elementConstructor) {
        registerElement(tagName, elementConstructor);
    };
}
//# sourceMappingURL=customElement.jsx.map