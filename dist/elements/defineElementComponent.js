import { sharedConfig as a, children as b, splitProps as u, mergeProps as E } from "solid-js";
import { getNextElement as x, spread as y } from "solid-js/web";
import { registerElement as j } from "./registerElement.js";
function H(c, d, e, k) {
  const l = typeof d != "boolean" && d;
  function i() {
    if (!customElements.get(c)) {
      if (l)
        j(c, l);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let n;
  if (l) {
    const f = l;
    n = (s) => {
      i();
      const r = a.context ? x() : document.createElement(c), t = r.renderRoot === r, m = b(() => s.children), [, h, g] = u(s, ["children"], Object.keys(f.reactive ?? {}));
      for (const o of Object.keys(h))
        r[o] = h[o];
      return r.slottedChildren = (t && m.toArray()) ?? [], y(r, E(g, {
        children: (!t && m) ?? []
      }), !1, t), r;
    };
  } else
    n = (f) => {
      i();
      const [s, r] = u(f, ["children"]), t = a.context ? x() : document.createElement(c);
      return e == null || e.propsHandler(r), y(t, E(e == null ? void 0 : e.initialProps, r, {
        children: (d && s.children) ?? []
      }), !1, !d), t;
    };
  return n.tagName = c, n.register = i, n;
}
export {
  H as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
