import {createSignalFromObservable} from "@appspltfrm/solidx/reactivity";
import {of} from "rxjs";
import {For} from "solid-js";

export default function () {

    const [data] = createSignalFromObservable(() => of(["aaa"]))

    return <div>
        <For each={data()}>
            {a => <span>{a}</span>}
        </For>
    </div>
}
