import { memo as c, insert as b, template as g } from "solid-js/web";
import { compose as w, register as C } from "component-register";
import { withSolid as k, getCurrentElement as O } from "solid-element";
import { splitProps as R } from "solid-js";
const _ = /* @__PURE__ */ g("<style></style>", 2);
function $(l, n) {
  if (customElements.get(l))
    return;
  const i = n, d = {
    slottedChildren: void 0
  };
  for (const e of Object.keys(i.reactive ?? {}))
    d[e] = Object.assign({
      value: void 0
    });
  const a = n.prototype.connectedCallback, p = n.prototype.disconnectedCallback, r = Object.getOwnPropertyDescriptor(n.prototype, "renderRoot"), m = w(C(l, d, {
    BaseElement: n
  }), k)((e) => {
    const t = i.__shadowStyles, [s, h] = R(e, ["slottedChildren"]), o = O();
    return a && a.call(o), p && o.addReleaseCallback(() => p.call(o)), [c((() => {
      const y = c(() => !!(o.renderRoot === o.shadowRoot && t));
      return () => y() && (typeof t == "string" ? [t] : t).map((u) => (() => {
        const f = _.cloneNode(!0);
        return b(f, u), f;
      })());
    })()), c(() => o.template({
      props: h,
      children: (s == null ? void 0 : s.slottedChildren) ?? []
    }))];
  });
  r != null && r.get && Object.defineProperty(m.prototype, "renderRoot", {
    get() {
      var t;
      const e = (t = r.get) == null ? void 0 : t.call(this);
      if (e)
        return e;
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
