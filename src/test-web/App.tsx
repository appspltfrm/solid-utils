import {A, Route, Routes, useLocation} from "@solidjs/router";
import {lazy} from "solid-js";
import type {Component} from "solid-js";

const App: Component = () => {

    const location = useLocation()

    return <div>

        {location.pathname === "/" && <ul>
            <li>
                <A href="/test">test</A>
            </li>
        </ul>}

        <Routes>
            <Route path="/test" component={lazy(() => import("./TestLoadingContext"))}/>
        </Routes>
    </div>
};

export default App;
