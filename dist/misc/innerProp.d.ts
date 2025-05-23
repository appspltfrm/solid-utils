import { MessageRef } from "@appspltfrm/js-intl";
import { HtmlString } from "@appspltfrm/js-utils/core";
import { JSXElement } from "solid-js";
export declare function innerProp(inner: any | HtmlString | MessageRef | JSXElement): {
    innerHTML: string;
    children?: undefined;
} | {
    children: any;
    innerHTML?: undefined;
};
