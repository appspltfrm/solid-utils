import { MessageRef } from "@co.mmons/js-intl";
import { HtmlString } from "@co.mmons/js-utils/core";
export declare function innerProp(inner: any | HtmlString | MessageRef): {
    innerHTML: string;
    innerText?: undefined;
} | {
    innerText: any;
    innerHTML?: undefined;
};
