import {MessageRef, translate} from "@appspltfrm/js-intl";
import {HtmlString} from "@appspltfrm/js-utils/core";

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
