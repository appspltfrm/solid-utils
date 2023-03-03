import {A, Route, Routes, useLocation} from "@solidjs/router";
import type {Component} from "solid-js";
import {lazy} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";

const App: Component = () => {

    const location = useLocation()

    return <Fragment>

        {location.pathname === "/" && <ul>
            <li>
                <A href="/elements">Elements</A>
            </li>
            <li>
                <A href="/literal-templates">Literal templates</A>
            </li>
            <li>
                <A href="/vars">Vars</A>
            </li>
            <li>
                <A href="/light-dom-element">light dom</A>
            </li>
            <li>
                <A href="/reactivity">reactivity</A>
            </li>
        </ul>}

        <Routes>
            <Route path="/light-dom-element" component={lazy(() => import("./light-dom-element"))}/>
            <Route path="/vars" component={lazy(() => import("./vars"))}/>
            <Route path="/reactivity" component={lazy(() => import("./reactivity"))}/>
            <Route path="/elements" component={lazy(() => import("./elements"))}/>
            <Route path="/literal-templates" component={lazy(() => import("./literal-templates"))}/>
        </Routes>
    </Fragment>
};

export default App;
