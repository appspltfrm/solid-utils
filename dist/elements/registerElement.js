import { memo as l, insert as g, template as w } from "solid-js/web";
import { compose as C, register as k } from "component-register";
import { withSolid as O, getCurrentElement as j } from "solid-element";
import { splitProps as E } from "solid-js";
const _ = /* @__PURE__ */ w("<style></style>", 2);
function v(c, r) {
  if (customElements.get(c))
    return;
  const i = r, a = {
    slottedChildren: void 0
  };
  for (const o of Object.keys(i.reactive ?? {}))
    a[o] = Object.assign({
      value: void 0
    });
  const d = r.prototype.connectedCallback, p = r.prototype.disconnectedCallback;
  let e, s = r;
  for (; s !== HTMLElement && (e = Object.getOwnPropertyDescriptor(s.prototype, "renderRoot"), !e); )
    s = Object.getPrototypeOf(s);
  const h = C(k(c, a, {
    BaseElement: r
  }), O)((o) => {
    const t = i.__shadowStyles, [f, y] = E(o, ["slottedChildren"]), n = j();
    return d && d.call(n), p && n.addReleaseCallback(() => p.call(n)), [l((() => {
      const b = l(() => !!(n.renderRoot === n.shadowRoot && t));
      return () => b() && (typeof t == "string" ? [t] : t).map((u) => (() => {
        const m = _.cloneNode(!0);
        return g(m, u), m;
      })());
    })()), l(() => n.template({
      props: y,
      children: f.slottedChildren ?? []
    }))];
  });
  e != null && e.get && Object.defineProperty(h.prototype, "renderRoot", {
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
  v as registerElement
};
//# sourceMappingURL=registerElement.js.map
