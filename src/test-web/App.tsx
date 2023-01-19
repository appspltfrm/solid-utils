import {Button} from "@appspltfrm/solid-utils/ui";
import type {Component} from "solid-js";
import {lazy} from "solid-js";
import {Fragment} from "solid-js/h/jsx-runtime";
import html from "solid-js/html";
import {FunctionalCmpTest} from "./FunctionalCmpTest";
import {Test} from "./elements/TestElement";

const LazyTestElement = lazy(() => import("./elements/TestElement"));

const App: Component = () => {
    return <Fragment>
        <fieldset>
            <legend>Button</legend>
            <Button>
                <span style="font-weight: bold">Jakiś tekst!</span>
            </Button>
        </fieldset>

        <fieldset>
            <legend>Functional component</legend>
            <FunctionalCmpTest onChange={(e) => console.log(e)}/>
        </fieldset>

        <fieldset>
            <legend>Solid web component</legend>
            <Test state="test" class="sdsd" app-aj="test" camelCaseProp="🐪"/>
        </fieldset>

        <fieldset>
            <legend>Web component</legend>
            <test-element camel-case-prop="yeah"/>
        </fieldset>

        <fieldset>
            <legend>Lazy solid web component</legend>
            <LazyTestElement camelCaseProp="nop" state="lazy" style="color: red"/>
        </fieldset>

        <fieldset>
            <legend>Template literal solid web component</legend>
            {html`<${Test} state="template" style=${{color: "green"}}/>`}
        </fieldset>

        <fieldset>
            <legend>Template literal lazy solid web component</legend>
            {html`<${LazyTestElement} state="lazy-template"/>`}
        </fieldset>

    </Fragment>
};

export default App;
