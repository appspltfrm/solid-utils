import type {Component} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import {FunctionalCmpTest} from "./components/FunctionalCmpTest";
import {WebCmpTest} from "./components/WebCmpTest";

const App: Component = () => {
    return <Fragment>
        <FunctionalCmpTest onChange={(e) => console.log(e)}/>
        <div style={{"font-weight": "bold"}}></div>
        <WebCmpTest class="sdsd" state="yes" onClick={(e) => console.log(e)}/>
        <web-test state="yes"/>
        <div>heelo</div>
    </Fragment>
};

export default App;
