import {buildWebComponent} from "stable";

export interface WebCmpTestProps {
    state?: string;
}

export const WebCmpTest = buildWebComponent<WebCmpTestProps>("web-test")
    .baseElement(HTMLAnchorElement)
    .prop("state")
    .template(props => {
        return <div>web cmp hello</div>
    }).build()
