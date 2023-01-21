import {Route, Routes} from "@solidjs/router";
import type {Component} from "solid-js";
import {lazy} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";

const App: Component = () => {
    return <Fragment>

        <div style="margin: 32px 0">
            <a href="/literal-templates">Literal templates</a>
        </div>

        <Routes>
            <Route path="/literal-templates" component={lazy(() => import("./literal-templates"))}/>
        </Routes>
    </Fragment>
};

export default App;
