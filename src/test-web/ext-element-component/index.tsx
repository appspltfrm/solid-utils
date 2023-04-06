import {defineComponent} from "@appspltfrm/solidx/elements";
import type {JSX} from "@ionic/core/components";
import {defineCustomElement} from "@ionic/core/components/ion-button";
import {onCleanup, ParentProps} from "solid-js";

const ExtTest = defineElementComponent<"ion-button", HTMLIonButtonElement, ParentProps<JSX.IonButton>>("ion-button", {define: defineCustomElement});

const OtherComp = () => {
    onCleanup(() => console.log("cleanup"));
    return <div>yehhh</div>;
}

export default function() {

    return <>
        <ExtTest>
            <OtherComp/>
        </ExtTest>
    </>
}
