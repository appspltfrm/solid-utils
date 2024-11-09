import { MessageRef } from "@appspltfrm/js-intl";
import { HtmlString } from "@appspltfrm/js-utils/core";
export declare function innerProp(inner: any | HtmlString | MessageRef): {
    innerHTML: string;
    innerText?: undefined;
} | {
    innerText: any;
    innerHTML?: undefined;
};
