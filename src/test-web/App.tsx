import {A, Route, useLocation} from "@solidjs/router";
import {lazy} from "solid-js";
import type {Component} from "solid-js";

const App: Component = () => {

    const location = useLocation()

    return <div>

        {location.pathname === "/" && <ul>
            <li>
                <A href="/test">test loading context</A>
            </li>
            <li>
                <A href="/test-reactivity">test reactivity</A>
            </li>
            <li>
                <A href="/test-inner-prop">test inner prop</A>
            </li>
        </ul>}

        <Route path="/test" component={lazy(() => import("./TestLoadingContext"))}/>
        <Route path="/test-reactivity" component={lazy(() => import("./TestReactivity"))}/>
        <Route path="/test-inner-prop" component={lazy(() => import("./TestInnerProp"))}/>
    </div>
};

export default App;
