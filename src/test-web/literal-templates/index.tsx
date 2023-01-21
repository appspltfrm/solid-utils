import {Button, ButtonElement} from "@appspltfrm/solid-utils/ui/Button";
import {lazy} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import html from "solid-js/html";

const LazyButton = lazy(async () => import("@appspltfrm/solid-utils/ui/Button"));

export default function() {
    return <Fragment>

        <fieldset>
            <legend>Template literal solid web component</legend>
            {html`<${Button} text="Test" style=${{color: "green"}}/>`}
        </fieldset>

        <fieldset>
            <legend>Template literal lazy solid web component</legend>
            {html`<${LazyButton} text="Lazy button"/>`}
        </fieldset>

    </Fragment>
}
