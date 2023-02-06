import { SolidElement } from "./SolidElement";
export type ElementProps<Element extends SolidElement> = Omit<{
    [P in keyof Element]: Element[P];
}, keyof SolidElement | "template" | "renderRoot" | "connectedCallback" | "disconnectedCallback">;
