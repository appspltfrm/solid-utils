import { createComponent as h, memo as m, insert as u, template as g } from "solid-js/web";
import { compose as y, register as b, noShadowDOM as w } from "component-register";
import { withSolid as k, getCurrentElement as C } from "solid-element";
import { splitProps as S } from "solid-js";
import { Fragment as E } from "solid-js/h/jsx-runtime";
const v = /* @__PURE__ */ g("<style></style>", 2);
function B(s, e) {
  if (customElements.get(s))
    return;
  const n = e, l = {
    __children: void 0
  };
  for (const r of n.__reactive ?? [])
    l[r] = Object.assign({
      value: void 0
    });
  const i = e.prototype.connectedCallback, a = e.prototype.disconnectedCallback;
  y(b(s, l, {
    BaseElement: e
  }), k)((r) => {
    const d = !n.__noShadow, t = d && n.__shadowStyles;
    d || w();
    const [c, f] = S(r, ["__children"]), o = C();
    return i && i.call(o), a && o.addReleaseCallback(() => a.call(o)), h(E, {
      get children() {
        return [m(() => t && (typeof t == "string" ? [t] : t).map((_) => (() => {
          const p = v.cloneNode(!0);
          return u(p, _), p;
        })())), m(() => o.template({
          props: f,
          children: (c == null ? void 0 : c.__children) ?? []
        }))];
      }
    });
  });
}
export {
  B as registerElement
};
//# sourceMappingURL=registerElement.js.map
