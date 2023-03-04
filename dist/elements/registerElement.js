import { memo as l, insert as g, template as w } from "solid-js/web";
import { compose as C, register as k } from "component-register";
import { withSolid as O, getCurrentElement as j } from "solid-element";
import { splitProps as E } from "solid-js";
const _ = /* @__PURE__ */ w("<style></style>", 2);
function v(c, n) {
  if (customElements.get(c))
    return;
  const i = n, a = {
    slottedChildren: void 0
  };
  for (const o of Object.keys(i.reactive ?? {}))
    a[o] = Object.assign({
      value: void 0,
      parse: !0,
      reflect: !0
    });
  const p = n.prototype.connectedCallback, d = n.prototype.disconnectedCallback;
  let e, s = n;
  for (; s !== HTMLElement && (e = Object.getOwnPropertyDescriptor(s.prototype, "renderRoot"), !e); )
    s = Object.getPrototypeOf(s);
  const h = C(k(c, a, {
    BaseElement: n
  }), O)((o) => {
    const t = i.__shadowStyles, [f, u] = E(o, ["slottedChildren"]), r = j();
    return p && p.call(r), d && r.addReleaseCallback(() => d.call(r)), [l((() => {
      const y = l(() => !!(r.renderRoot === r.shadowRoot && t));
      return () => y() && (typeof t == "string" ? [t] : t).map((b) => (() => {
        const m = _.cloneNode(!0);
        return g(m, b), m;
      })());
    })()), l(() => r.template({
      props: u,
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
