import {CustomElement} from "./CustomElement";

export type ElementProps<
    Element extends CustomElement,
    PropName extends keyof Element = keyof Element,
    PropType = Element[PropName]> =
    Omit<{[P in keyof Element]?: Element[P]}, {[P in keyof Element]: (Element[P] extends Function ? P : never)}[keyof Element] | keyof HTMLElement | keyof CustomElement>
