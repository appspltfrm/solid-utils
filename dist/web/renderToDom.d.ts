import { Component, lazy } from "solid-js";
declare const disposeProp: unique symbol;
type SolidComponent = Component | ReturnType<typeof lazy>;
type SolidComponentWrapper = {
    component: SolidComponent | string;
};
export type RenderedElement<T extends Element = Element> = T & {
    [disposeProp]?: VoidFunction;
};
export declare function renderToDom<T extends Element = Element>(parentNode: Node, rawComponent: SolidComponent | SolidComponentWrapper | string, props?: any): Promise<RenderedElement<T>>;
export declare function disposeRenderedElement(element: RenderedElement): Promise<void>;
export {};
