import {lazy} from "solid-js";
import type {Component} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import {FunctionalCmpTest} from "./components/FunctionalCmpTest";
import {WebCmpTest} from "./components/WebCmpTest";
import html from "solid-js/html";

const LazyWebCmpTest = lazy(() => import("./components/WebCmpTest"));

const App: Component = () => {
    return <Fragment>

        <fieldset>
            <legend>Functional component</legend>
            <FunctionalCmpTest onChange={(e) => console.log(e)}/>
        </fieldset>

        <fieldset>
            <legend>Solid web component</legend>
            <WebCmpTest class="sdsd" camelCaseProp="🐪" state="yes"/>
        </fieldset>

        <fieldset>
            <legend>Web component</legend>
            <web-test state="yes" camel-case-prop="🐪"/>
        </fieldset>

        <fieldset>
            <legend>Lazy solid web component</legend>
            <LazyWebCmpTest state="lazy" style="color: red"/>
        </fieldset>

        <fieldset>
            <legend>Template literal solid web component</legend>
            {html`<${WebCmpTest} state="template" style=${{color: "green"}}/>`}
        </fieldset>

        <fieldset>
            <legend>Template literal lazy solid web component</legend>
            {html`<${LazyWebCmpTest} state="lazy-template"/>`}
        </fieldset>

    </Fragment>
};

export default App;
