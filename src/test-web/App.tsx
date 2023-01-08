import type {Component} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import {FunctionalCmpTest} from "./components/FunctionalCmpTest";
import {WebCmpTest} from "./components/WebCmpTest";

const App: Component = () => {
    return <Fragment>
        <FunctionalCmpTest onChange={(e) => console.log(e)}/>
        <WebCmpTest state="yes" onStateChange={(e) => console.log(e)}/>
        <div>heelo</div>
    </Fragment>
};

export default App;
