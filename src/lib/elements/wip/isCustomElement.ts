import {customElementBirthmark} from "./customElementBirthmark";

export function isCustomElement(element: HTMLElement) {
    return (element as any)[customElementBirthmark] === true;
}
