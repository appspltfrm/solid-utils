/* @refresh reload */
import {Route, Router} from "@solidjs/router";
import {lazy} from "solid-js";
import {render} from "solid-js/web";
import App from "./App";

render(() => <Router>
    <Route path="/" component={App}/>
    <Route path="/test" component={lazy(() => import("./TestLoadingContext"))}/>
    <Route path="/test-reactivity" component={lazy(() => import("./TestReactivity"))}/>
    <Route path="/test-inner-prop" component={lazy(() => import("./TestInnerProp"))}/>
</Router>, document.getElementById("root") as HTMLElement);
