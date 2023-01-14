import {JSX} from "solid-js/h/jsx-runtime";
import {ElementProps} from "./ElementProps";

export abstract class CustomHTMLElement extends HTMLElement {

    /**
     * blah
     * @param props
     */
    abstract template(props: any): JSX.Element;
}

