import { memo as n, insert as g, template as w } from "solid-js/web";
import { compose as C, register as k } from "component-register";
import { withSolid as O, getCurrentElement as j } from "solid-element";
import { splitProps as E } from "solid-js";
const _ = /* @__PURE__ */ w("<style></style>", 2);
function $(c, r) {
  if (customElements.get(c))
    return;
  const a = r, i = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const o of Object.keys(a.reactive ?? {}))
    i[o] = Object.assign({
      value: void 0,
      parse: !1,
      reflect: !1
    });
  const d = r.prototype.connectedCallback, p = r.prototype.disconnectedCallback;
  let e, l = r;
  for (; l !== HTMLElement && (e = Object.getOwnPropertyDescriptor(l.prototype, "renderRoot"), !e); )
    l = Object.getPrototypeOf(l);
  const m = C(k(c, i, {
    BaseElement: r
  }), O)((o) => {
    const t = a.__shadowStyles, [f, y] = E(o, ["slottedChildren"]), s = j();
    return d && d.call(s), p && s.addReleaseCallback(() => p.call(s)), [n((() => {
      const u = n(() => !!(s.renderRoot === s.shadowRoot && t));
      return () => u() && (typeof t == "string" ? [t] : t).map((b) => (() => {
        const h = _.cloneNode(!0);
        return g(h, b), h;
      })());
    })()), n(() => s.template({
      props: y,
      children: f.slottedChildren ?? []
    }))];
  });
  e != null && e.get && Object.defineProperty(m.prototype, "renderRoot", {
    get() {
      var t;
      const o = (t = e == null ? void 0 : e.get) == null ? void 0 : t.call(this);
      if (o)
        return o;
      if (!this.shadowRoot)
        return this.attachShadow({
          mode: "open"
        });
    }
  });
}
export {
  $ as registerElement
};
//# sourceMappingURL=registerElement.js.map
