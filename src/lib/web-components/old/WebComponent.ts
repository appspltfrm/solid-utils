import {JSX} from "solid-js/h/jsx-runtime";

interface WebComponent<Props, Events, TagName extends string, ElementClass extends HTMLElement> {
    (props: Props): JSX.Element;
    tagName: TagName;
    elementClass: ElementClass;
    template: (template: ((props: Props, addons: {element: ElementClass}) => JSX.Element)) => this;
}
