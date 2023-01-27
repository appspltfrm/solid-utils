import {CustomElement} from "./CustomElement";

export type ElementProps<Element extends CustomElement> = Omit<{[P in keyof Element]: Element[P]}, keyof CustomElement | "template">
