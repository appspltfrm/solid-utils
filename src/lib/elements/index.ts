export * from "./vars";
export type {CustomElementComponent, ElementComponent, ElementComponentOptions} from "./defineComponent";
export type {CustomElementEventMap} from "./CustomElementEventMap";
export type {CustomElementInterface, CustomElementTemplate, CustomElementPropertyValueChangeCallback, CustomElementDisconnectedCallback} from "./CustomElementInterface";
export type {CustomElementJSXIntrinsic} from "./CustomElementJSXIntrinsic";
export type {CustomElementOptions} from "./CustomElementOptions";
export {CustomElement} from "./CustomElement";
export {defineCustomElement} from "./defineCustomElement";
export {defineComponent} from "./defineComponent";
export {isCustomElement} from "./isCustomElement";
export {reactive} from "./reactive";

declare module "solid-js" {
    namespace JSX {
        interface ExplicitAttributes {
            [key: string]: string;
        }
    }
}
