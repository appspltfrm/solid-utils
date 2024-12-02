import {createSignalFromObservable, createStoreFromObservable} from "@appspltfrm/solidx/reactivity";
import {of} from "rxjs";
import {createSignal, For} from "solid-js";

export default function () {

    const [value, setValue] = createSignal(["aaa"]);

    const [data] = createStoreFromObservable(() => of({aaa: value()}))

    return <div>
        <button onClick={() => setValue(() => ["bbb"])}>click</button>
        <For each={data.aaa}>
            {a => <span>{a}</span>}
        </For>
    </div>
}
