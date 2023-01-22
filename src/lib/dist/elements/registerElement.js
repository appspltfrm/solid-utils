import { createComponent as _, memo as c, insert as a, template as u } from "solid-js/web";
import { compose as h, register as g, noShadowDOM as w } from "component-register";
import { withSolid as y, getCurrentElement as S } from "solid-element";
import { splitProps as E } from "solid-js";
import { Fragment as v } from "solid-js/h/jsx-runtime";
const x = /* @__PURE__ */ u("<style></style>", 2);
function j(r, s) {
  if (customElements.get(r))
    return;
  const t = s, i = {
    __children: void 0
  };
  for (const o of t.__reactive ?? [])
    i[o] = Object.assign({
      value: void 0
    });
  h(g(r, i, {
    BaseElement: s
  }), y)((o) => {
    const m = !t.__noShadow, e = m && t.__shadowStyles;
    m || w();
    const [n, l] = E(o, ["__children"]), d = S();
    return _(v, {
      get children() {
        return [c(() => e && (typeof e == "string" ? [e] : e).map((f) => (() => {
          const p = x.cloneNode(!0);
          return a(p, f), p;
        })())), c(() => d.template({
          props: l,
          children: (n == null ? void 0 : n.__children) ?? []
        }))];
      }
    });
  });
}
export {
  j as registerElement
};
//# sourceMappingURL=registerElement.js.map
