import { Component, lazy } from "solid-js";
type SolidComponent = Component | ReturnType<typeof lazy>;
type SolidComponentWrapper = {
    component: SolidComponent | string;
};
type RenderedElement<T extends Element = Element> = T & {
    "__solidDispose"?: () => void;
};
export declare function renderToDom<T extends Element = Element>(parentNode: Node, rawComponent: SolidComponent | SolidComponentWrapper | string, props?: any): Promise<RenderedElement<T>>;
export {};
