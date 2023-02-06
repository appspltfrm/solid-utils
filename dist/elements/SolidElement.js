var s = Object.defineProperty;
var r = (e, t, o) => t in e ? s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var a = (e, t, o) => (r(e, typeof t != "symbol" ? t + "" : t, o), o);
class d extends HTMLElement {
  get renderRoot() {
    return this.shadowRoot || this.attachShadow({ mode: "open" });
  }
}
/**
 * Returns definition of reactive props.
 */
a(d, "reactive");
export {
  d as SolidElement
};
//# sourceMappingURL=SolidElement.js.map
