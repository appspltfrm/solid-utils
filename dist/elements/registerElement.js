import { memo as s, insert as u, template as y } from "solid-js/web";
import { compose as b, register as C } from "component-register";
import { withSolid as k, getCurrentElement as w } from "solid-element";
import { splitProps as R } from "solid-js";
const g = /* @__PURE__ */ y("<style></style>", 2);
function v(l, t) {
  if (customElements.get(l))
    return;
  const c = t, d = {
    slottedChildren: void 0
  };
  for (const n of Object.keys(c.reactive ?? {}))
    d[n] = Object.assign({
      value: void 0
    });
  const i = t.prototype.connectedCallback, a = t.prototype.disconnectedCallback;
  b(C(l, d, {
    BaseElement: t
  }), k)((n) => {
    const o = c.__shadowStyles, [r, m] = R(n, ["slottedChildren"]), e = w();
    return e.renderRoot || Object.defineProperty(e, "renderRoot", {
      value: e.shadowRoot || e.attachShadow({
        mode: "open"
      })
    }), i && i.call(e), a && e.addReleaseCallback(() => a.call(e)), [s((() => {
      const f = s(() => !!(e.renderRoot === e.shadowRoot && o));
      return () => f() && (typeof o == "string" ? [o] : o).map((h) => (() => {
        const p = g.cloneNode(!0);
        return u(p, h), p;
      })());
    })()), s(() => e.template({
      props: m,
      children: (r == null ? void 0 : r.slottedChildren) ?? []
    }))];
  });
}
export {
  v as registerElement
};
//# sourceMappingURL=registerElement.js.map
