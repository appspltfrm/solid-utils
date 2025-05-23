import {MessageRef, translate} from "@appspltfrm/js-intl";
import {HtmlString} from "@appspltfrm/js-utils/core";
import {JSXElement} from "solid-js";

export function innerProp(inner: any | HtmlString | MessageRef | JSXElement) {

    if (inner instanceof MessageRef) {
        inner = translate(inner);
    }

    if (inner instanceof HtmlString) {
        return {innerHTML: inner.toString()};
    } else {
        return {children: inner};
    }
}
