import {defineElementComponent, ElementTemplate, SolidElement} from "@appspltfrm/solidx/elements";
import {createSignal} from "solid-js";
import Test2 from "./TestElement2";

export default defineElementComponent("test-reactivity1", class extends SolidElement {

    template({children}: ElementTemplate<this>) {

        const [error, setError] = createSignal<any>("yes");

        return <div>
            <button onClick={() => setError(new Error())}>tirgger</button>
            <Test2 errors={error()}/>
        </div>
    }
})
