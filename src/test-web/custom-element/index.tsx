import {defineCustomElement} from "@appspltfrm/solidx/elements/wip";
import {customElement} from "solid-element";
import {createEffect, createSignal} from "solid-js";
import {Dynamic} from "solid-js/web";
import {TestElement} from "./TestElement";

defineCustomElement("test-element", TestElement);

export default function() {

    const [el, setEl] = createSignal<HTMLElement>();

    const [propValue, setPropValue] = createSignal<string>("")
    setInterval(() => setPropValue(Date.now() + ""), 1000);

    createEffect(() => {
        if (el()) {
            el()!.setAttribute("some-prop", propValue())
        }
    })

    return <>
        <test-element ref={setEl}/>
    </>
}
