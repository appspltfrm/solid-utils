import { memo as m, insert as h, template as u } from "solid-js/web";
import { compose as y, register as b, noShadowDOM as w } from "component-register";
import { withSolid as g, getCurrentElement as k } from "solid-element";
import { splitProps as S } from "solid-js";
const C = /* @__PURE__ */ u("<style></style>", 2);
function O(l, e) {
  if (customElements.get(l))
    return;
  const n = e, r = {
    __children: void 0
  };
  for (const s of n.__reactive ?? [])
    r[s] = Object.assign({
      value: void 0
    });
  const i = e.prototype.connectedCallback, a = e.prototype.disconnectedCallback;
  y(b(l, r, {
    BaseElement: e
  }), g)((s) => {
    const d = !n.__noShadow, t = d && n.__shadowStyles;
    d || w();
    const [c, f] = S(s, ["__children"]), o = k();
    return i && i.call(o), a && o.addReleaseCallback(() => a.call(o)), [m(() => t && (typeof t == "string" ? [t] : t).map((_) => (() => {
      const p = C.cloneNode(!0);
      return h(p, _), p;
    })())), m(() => o.template({
      props: f,
      children: (c == null ? void 0 : c.__children) ?? []
    }))];
  });
}
export {
  O as registerElement
};
//# sourceMappingURL=registerElement.js.map
