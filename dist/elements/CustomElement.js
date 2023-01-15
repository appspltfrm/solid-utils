export class CustomElement extends HTMLElement {
    get renderRoot() {
        return this.shadowRoot ?? this.attachShadow({ mode: "open" });
    }
}
//# sourceMappingURL=CustomElement.js.map