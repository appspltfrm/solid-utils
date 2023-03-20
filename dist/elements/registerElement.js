import { memo as a, insert as g, template as w } from "solid-js/web";
import { compose as C, register as O } from "component-register";
import { withSolid as j, getCurrentElement as k } from "solid-element";
import { splitProps as E } from "solid-js";
const R = /* @__PURE__ */ w("<style></style>", 2);
function $(d, s) {
  if (customElements.get(d))
    return;
  const p = s, f = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const [n, e] of Object.entries(p.reactive ?? {})) {
    const r = {
      value: void 0,
      notify: !1,
      parse: !1,
      reflect: !1,
      attribute: void 0
    };
    typeof e == "object" && Object.assign(r, e), f[n] = r;
  }
  const h = s.prototype.connectedCallback, m = s.prototype.disconnectedCallback;
  let o, c = s;
  for (; c !== HTMLElement && (o = Object.getOwnPropertyDescriptor(c.prototype, "renderRoot"), !o); )
    c = Object.getPrototypeOf(c);
  const b = C(O(d, f, {
    BaseElement: s
  }), j)((n) => {
    const e = p.__shadowStyles, [r, u] = E(n, ["slottedChildren"]), t = k();
    if (h && h.call(t), m && t.addReleaseCallback(() => m.call(t)), t.renderRoot === t.shadowRoot)
      return [a((() => {
        const l = a(() => !!(t.renderRoot === t.shadowRoot && e));
        return () => l() && (typeof e == "string" ? [e] : e).map((i) => (() => {
          const y = R.cloneNode(!0);
          return g(y, i), y;
        })());
      })()), a(() => t.template({
        props: u,
        children: r.slottedChildren ?? []
      }))];
    {
      const l = r.slottedChildren ?? [], i = t.template({
        props: u,
        children: l
      });
      return i === void 0 || i === l && l.length === 0 ? void 0 : i;
    }
  });
  o != null && o.get && Object.defineProperty(b.prototype, "renderRoot", {
    get() {
      var e;
      const n = (e = o == null ? void 0 : o.get) == null ? void 0 : e.call(this);
      if (n)
        return n;
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
