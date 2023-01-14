export type ElementProps<
    Element extends HTMLElement,
    PropName extends keyof Element = keyof Element,
    PropType = Element[PropName]> =
    Omit<Omit<{[P in keyof Element]?: Element[P]}, {[P in keyof Element]: (Element[P] extends Function ? P : never)}[keyof Element]>, keyof HTMLElement>
