import { memo as i, insert as g, template as w } from "solid-js/web";
import { compose as C, register as O } from "component-register";
import { withSolid as j, getCurrentElement as k } from "solid-element";
import { splitProps as E } from "solid-js";
const R = /* @__PURE__ */ w("<style></style>", 2);
function $(c, s) {
  if (customElements.get(c))
    return;
  const a = s, d = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const [r, e] of Object.entries(a.reactive ?? {})) {
    const n = {
      value: void 0,
      notify: !1,
      parse: !1,
      reflect: !1,
      attribute: void 0
    };
    typeof e == "object" && Object.assign(n, e), d[r] = n;
  }
  const p = s.prototype.connectedCallback, f = s.prototype.disconnectedCallback;
  let o, l = s;
  for (; l !== HTMLElement && (o = Object.getOwnPropertyDescriptor(l.prototype, "renderRoot"), !o); )
    l = Object.getPrototypeOf(l);
  const u = C(O(c, d, {
    BaseElement: s
  }), j)((r) => {
    const e = a.__shadowStyles, [n, h] = E(r, ["slottedChildren"]), t = k();
    return p && p.call(t), f && t.addReleaseCallback(() => f.call(t)), t.renderRoot === t.shadowRoot ? [i((() => {
      const y = i(() => !!(t.renderRoot === t.shadowRoot && e));
      return () => y() && (typeof e == "string" ? [e] : e).map((b) => (() => {
        const m = R.cloneNode(!0);
        return g(m, b), m;
      })());
    })()), i(() => t.template({
      props: h,
      children: n.slottedChildren ?? []
    }))] : t.template({
      props: h,
      children: n.slottedChildren ?? []
    });
  });
  o != null && o.get && Object.defineProperty(u.prototype, "renderRoot", {
    get() {
      var e;
      const r = (e = o == null ? void 0 : o.get) == null ? void 0 : e.call(this);
      if (r)
        return r;
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
