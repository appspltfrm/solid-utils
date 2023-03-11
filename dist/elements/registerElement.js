import { memo as i, insert as g, template as w } from "solid-js/web";
import { compose as C, register as O } from "component-register";
import { withSolid as j, getCurrentElement as k } from "solid-element";
import { splitProps as E } from "solid-js";
const _ = /* @__PURE__ */ w("<style></style>", 2);
function $(c, s) {
  if (customElements.get(c))
    return;
  const a = s, p = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const [o, e] of Object.entries(a.reactive ?? {})) {
    const n = {
      value: void 0,
      notify: !1,
      parse: !1,
      reflect: !1,
      attribute: void 0
    };
    typeof e == "object" && Object.assign(n, e), p[o] = n;
  }
  const d = s.prototype.connectedCallback, f = s.prototype.disconnectedCallback;
  let t, l = s;
  for (; l !== HTMLElement && (t = Object.getOwnPropertyDescriptor(l.prototype, "renderRoot"), !t); )
    l = Object.getPrototypeOf(l);
  const m = C(O(c, p, {
    BaseElement: s
  }), j)((o) => {
    const e = a.__shadowStyles, [n, u] = E(o, ["slottedChildren"]), r = k();
    return d && d.call(r), f && r.addReleaseCallback(() => f.call(r)), [i((() => {
      const y = i(() => !!(r.renderRoot === r.shadowRoot && e));
      return () => y() && (typeof e == "string" ? [e] : e).map((b) => (() => {
        const h = _.cloneNode(!0);
        return g(h, b), h;
      })());
    })()), i(() => r.template({
      props: u,
      children: n.slottedChildren ?? []
    }))];
  });
  t != null && t.get && Object.defineProperty(m.prototype, "renderRoot", {
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
  $ as registerElement
};
//# sourceMappingURL=registerElement.js.map
