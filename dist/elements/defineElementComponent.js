import { sharedConfig as u, children as k, splitProps as y, mergeProps as E } from "solid-js";
import { getNextElement as g, spread as x } from "solid-js/web";
import { registerElement as P } from "./registerElement.js";
function L(c, f, e, v) {
  const l = typeof f != "boolean" && f;
  function o() {
    if (!customElements.get(c)) {
      if (l)
        P(c, l);
      else if (e != null && e.define)
        for (const d of Array.isArray(e.define) ? e.define : [e.define])
          d();
    }
  }
  let n;
  if (l) {
    const d = l;
    n = (s) => {
      o();
      const r = u.context ? g() : document.createElement(c), t = r.renderRoot === r, m = k(() => s.children), [, i, b] = y(s, ["children"], Object.keys(d.reactive ?? {}));
      for (const a of Object.keys(i)) {
        const h = a.replace(/\.?([A-Z]+)/g, (p, j) => "-" + j.toLowerCase()).replace("_", "-").replace(/^-/, "");
        a !== h && Object.defineProperty(i, h, {
          get: () => i[a]
        });
      }
      return x(r, E(i, b, {
        children: (!t && m) ?? [],
        "slotted-children": (t && m.toArray()) ?? []
      }), !1, t), r;
    };
  } else
    n = (d) => {
      o();
      const [s, r] = y(d, ["children"]), t = u.context ? g() : document.createElement(c);
      return e == null || e.propsHandler(r), x(t, E(e == null ? void 0 : e.initialProps, r, {
        children: (f && s.children) ?? []
      }), !1, !f), t;
    };
  return n.tagName = c, n.register = o, n;
}
export {
  L as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
