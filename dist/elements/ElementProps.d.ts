import { CustomElement } from "./CustomElement";
export type ElementProps<Element extends CustomElement> = Omit<{
    [P in keyof Element]?: Element[P];
}, {
    [P in keyof Element]: (Element[P] extends Function ? P : never);
}[keyof Element] | keyof CustomElement>;
