import type {Component} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import {FunctionalCmpTest} from "./components/FunctionalCmpTest";
import {WebCmpTest} from "./components/WebCmpTest";

const App: Component = () => {
    return <Fragment>
        <FunctionalCmpTest/>
        <WebCmpTest state="yes"/>
        <div>heelo</div>
    </Fragment>
};

export default App;
