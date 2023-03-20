import { memo as m, insert as b, template as g } from "solid-js/web";
import { compose as w, register as C } from "component-register";
import { withSolid as O, getCurrentElement as j } from "solid-element";
import { splitProps as k } from "solid-js";
const E = /* @__PURE__ */ g("<style></style>", 2);
function R(i, s) {
  if (customElements.get(i))
    return;
  const a = s, c = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const [r, e] of Object.entries(a.reactive ?? {})) {
    const l = {
      value: void 0,
      notify: !1,
      parse: !1,
      reflect: !1,
      attribute: void 0
    };
    typeof e == "object" && Object.assign(l, e), c[r] = l;
  }
  const p = s.prototype.connectedCallback, d = s.prototype.disconnectedCallback;
  let t, n = s;
  for (; n !== HTMLElement && (t = Object.getOwnPropertyDescriptor(n.prototype, "renderRoot"), !t); )
    n = Object.getPrototypeOf(n);
  const u = w(C(i, c, {
    BaseElement: s
  }), O)((r) => {
    const e = a.__shadowStyles, [l, f] = k(r, ["slottedChildren"]), o = j();
    return p && p.call(o), d && o.addReleaseCallback(() => d.call(o)), o.renderRoot === o.shadowRoot ? [m(() => e && (typeof e == "string" ? [e] : e).map((y) => (() => {
      const h = E.cloneNode(!0);
      return b(h, y), h;
    })())), m(() => o.template({
      props: f,
      children: []
    }))] : o.template({
      props: f,
      children: l.slottedChildren ?? []
    });
  });
  t != null && t.get && Object.defineProperty(u.prototype, "renderRoot", {
    get() {
      var e;
      const r = (e = t == null ? void 0 : t.get) == null ? void 0 : e.call(this);
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
  R as registerElement
};
//# sourceMappingURL=registerElement.js.map
