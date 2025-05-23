import {HtmlString} from "@appspltfrm/js-utils/core";
import {innerProp} from "@appspltfrm/solidx/misc";

export default function () {
    return <div>
        <div>sdsd</div>
        <div {...innerProp(new HtmlString("html <b>string</b>"))}/>
        <div {...innerProp("simple string")}/>
        <div {...innerProp(<i>component</i>)}/>
    </div>
}
