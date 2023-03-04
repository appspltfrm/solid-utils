import {defineElementComponent} from "@appspltfrm/solidx/elements";
import {defineCustomElement} from "@ionic/core/components/ion-button";
import type {JSX} from "@ionic/core/components";
import {onCleanup} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";

const ExtTest = defineElementComponent<"ion-button", HTMLIonButtonElement, JSX.IonButton>("ion-button", true, {define: defineCustomElement});

const OtherComp = () => {
    onCleanup(() => console.log("cleanup"));
    return <div>yehhh</div>;
}

export default function() {

    return <Fragment>
        <ExtTest>
            <OtherComp/>
        </ExtTest>
    </Fragment>
}
