import { sharedConfig as E, children as x, splitProps as y, createEffect as g, mergeProps as o } from "solid-js";
import { getNextElement as b, spread as v } from "solid-js/web";
import { registerElement as H } from "./registerElement.js";
function _(n, l, e, C) {
  const s = typeof l != "boolean" && l;
  function i() {
    if (!customElements.get(n)) {
      if (s)
        H(n, s);
      else if (e != null && e.define)
        for (const t of Array.isArray(e.define) ? e.define : [e.define])
          t();
    }
  }
  let f;
  if (s) {
    const t = s;
    f = (m) => (i(), () => {
      const r = E.context ? b() : document.createElement(n), c = r.renderRoot === r, d = x(() => m.children), [, u, j] = y(m, ["children"], Object.keys(t.reactive ?? {}));
      return g(() => {
        for (const a of Object.keys(u)) {
          const h = u[a], k = r[a];
          h !== k && (r[a] = h);
        }
        return u;
      }), v(r, o(j, {
        children: (!c && d) ?? [],
        "slotted-children": (c && d.toArray()) ?? []
      }), !1, c), r;
    });
  } else
    f = (t) => (i(), () => {
      const m = x(() => t.children), [r, c] = y(t, ["children"]), d = E.context ? b() : document.createElement(n);
      return e != null && e.propsHandler && g(() => {
        e == null || e.propsHandler(c);
      }), v(d, o(e == null ? void 0 : e.initialProps, c, {
        children: (l && m) ?? []
      }), !1, !l), d;
    });
  return f.tagName = n, f.register = i, f;
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
