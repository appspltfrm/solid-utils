import {A, Routes, useLocation} from "@solidjs/router";
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
            {/*<Route path="/test" component={lazy(() => undefined)}/>*/}
        </Routes>
    </div>
};

export default App;
