export type { ElementJSXIntrinsic } from "./ElementJSXIntrinsic";
export type { ElementTemplate } from "./ElementTemplate";
export { CustomElement } from "./CustomElement";
export { Fragment } from "solid-js/h/jsx-runtime";
export { elementComponent } from "./elementComponent";
export { customElement } from "./decorators/customElement";
export { reactive } from "./decorators/reactive";
export { renderRoot } from "./decorators/renderRoot";
declare module "solid-js" {
    namespace JSX {
        interface ExplicitAttributes {
            [key: string]: string;
        }
    }
}
