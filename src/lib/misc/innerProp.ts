import {MessageRef, translate} from "@co.mmons/js-intl";
import {HtmlString} from "@co.mmons/js-utils/core";

export function innerProp(inner: any | HtmlString | MessageRef) {

    if (inner instanceof MessageRef) {
        inner = translate(inner);
    }

    if (inner instanceof HtmlString) {
        return {innerHTML: inner.toString()};
    } else {
        return {innerText: inner};
    }
}
