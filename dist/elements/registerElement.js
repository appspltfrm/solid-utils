import { memo as m, insert as u, template as _ } from "solid-js/web";
import { compose as y, register as C, noShadowDOM as b } from "component-register";
import { withSolid as w, getCurrentElement as g } from "solid-element";
import { splitProps as k } from "solid-js";
const S = /* @__PURE__ */ _("<style></style>", 2);
function O(r, e) {
  if (customElements.get(r))
    return;
  const n = e, c = {
    slottedChildren: void 0
  };
  for (const s of n.__reactive ?? [])
    c[s] = Object.assign({
      value: void 0
    });
  const i = e.prototype.connectedCallback, d = e.prototype.disconnectedCallback;
  y(C(r, c, {
    BaseElement: e
  }), w)((s) => {
    const a = !n.__noShadow, t = a && n.__shadowStyles;
    a || b();
    const [l, f] = k(s, ["slottedChildren"]), o = g();
    return i && i.call(o), d && o.addReleaseCallback(() => d.call(o)), [m(() => t && (typeof t == "string" ? [t] : t).map((h) => (() => {
      const p = S.cloneNode(!0);
      return u(p, h), p;
    })())), m(() => o.template({
      props: f,
      children: (l == null ? void 0 : l.slottedChildren) ?? []
    }))];
  });
}
export {
  O as registerElement
};
//# sourceMappingURL=registerElement.js.map
