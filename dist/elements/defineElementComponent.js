import { sharedConfig as h, children as u, splitProps as a, mergeProps as E, createEffect as b } from "solid-js";
import { getNextElement as o, spread as x } from "solid-js/web";
import { registerElement as v } from "./registerElement.js";
function P(n, l, e, C) {
  const s = typeof l != "boolean" && l;
  function m() {
    if (!customElements.get(n)) {
      if (s)
        v(n, s);
      else if (e != null && e.define)
        for (const r of Array.isArray(e.define) ? e.define : [e.define])
          r();
    }
  }
  let c;
  if (s) {
    const r = s;
    c = (i) => (m(), () => {
      const f = h.context ? o() : document.createElement(n), t = f.renderRoot === f, d = u(() => i.children), [, g, y] = a(i, ["children"], Object.keys(r.reactive ?? {}));
      return x(f, E(g, y, {
        children: (!t && d) ?? [],
        slottedChildren: (t && d.toArray()) ?? []
      }), !1, t), f;
    });
  } else
    c = (r) => (m(), () => {
      const i = u(() => r.children), [f, t] = a(r, ["children"]), d = h.context ? o() : document.createElement(n);
      return b(() => {
        e == null || e.propsHandler(t);
      }), x(d, E(e == null ? void 0 : e.initialProps, t, {
        children: (l && i) ?? []
      }), !1, !l), d;
    });
  return c.tagName = n, c.register = m, c;
}
export {
  P as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
