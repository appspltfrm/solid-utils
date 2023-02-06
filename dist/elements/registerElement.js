import { memo as c, insert as g, template as w } from "solid-js/web";
import { compose as C, register as O } from "component-register";
import { withSolid as k, getCurrentElement as j } from "solid-element";
import { splitProps as E } from "solid-js";
const _ = /* @__PURE__ */ w("<style></style>", 2);
function v(i, n) {
  if (customElements.get(i))
    return;
  const a = n, d = {
    slottedChildren: void 0
  };
  for (const o of Object.keys(a.reactive ?? {}))
    d[o] = Object.assign({
      value: void 0
    });
  const p = n.prototype.connectedCallback, f = n.prototype.disconnectedCallback;
  let t, r = n;
  for (; r !== HTMLElement; )
    t = Object.getOwnPropertyDescriptor(r, "renderRoot"), r = Object.getPrototypeOf(r);
  const h = C(O(i, d, {
    BaseElement: n
  }), k)((o) => {
    const e = a.__shadowStyles, [l, y] = E(o, ["slottedChildren"]), s = j();
    return p && p.call(s), f && s.addReleaseCallback(() => f.call(s)), [c((() => {
      const u = c(() => !!(s.renderRoot === s.shadowRoot && e));
      return () => u() && (typeof e == "string" ? [e] : e).map((b) => (() => {
        const m = _.cloneNode(!0);
        return g(m, b), m;
      })());
    })()), c(() => s.template({
      props: y,
      children: (l == null ? void 0 : l.slottedChildren) ?? []
    }))];
  });
  t != null && t.get && Object.defineProperty(h.prototype, "renderRoot", {
    get() {
      var e;
      const o = (e = t == null ? void 0 : t.get) == null ? void 0 : e.call(this);
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
