import {createLoadingContext, getLoadingContext} from "@appspltfrm/solidx/context";
import {sleep} from "@appspltfrm/js-utils/core";
import {createResource, Match, Switch} from "solid-js";

export default function () {

    const loadingContext = createLoadingContext();
    const job1 = createResource(async () => {
        try {
            const loadingContext = getLoadingContext()!;
            loadingContext.start("job1");
            await sleep(5000);
            console.log("stop");
            loadingContext.stop("job1");
            console.log(loadingContext.size())
        } catch (e) {
            console.warn(e)
        }
    })

    return <div>

        <div>
            <span>busy:</span>
            <Switch>
                <Match when={loadingContext.busy()}>
                    <span>yes</span>
                </Match>
                <Match when={true}>
                    <span>no</span>
                </Match>
            </Switch>
        </div>

    </div>
}
