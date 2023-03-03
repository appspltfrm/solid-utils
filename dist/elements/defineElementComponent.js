import { sharedConfig as E, children as k, splitProps as g, mergeProps as h } from "solid-js";
import { getNextElement as x, spread as b } from "solid-js/web";
import { registerElement as P } from "./registerElement.js";
function L(n, s, e, v) {
  const i = typeof s != "boolean" && s;
  function a() {
    if (!customElements.get(n)) {
      if (i)
        P(n, i);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let d;
  if (i) {
    const f = i;
    d = (c) => {
      a();
      const t = E.context ? x() : document.createElement(n), r = t.renderRoot === t, o = k(() => c.children), [, l, u] = g(c, ["children"], Object.keys(f.reactive ?? {}));
      for (const m of Object.keys(l)) {
        const y = m.replace(/\.?([A-Z]+)/g, (A, j) => "-" + j.toLowerCase()).replace("_", "-").replace(/^-/, "");
        m !== y && Object.defineProperty(l, y, {
          get: () => l[m]
        });
      }
      return h(l, u, {
        children: (!r && o) ?? [],
        "slotted-children": (r && o.toArray()) ?? []
      }), b(t, h(l, u, {
        children: (!r && o) ?? [],
        "slotted-children": (r && o.toArray()) ?? []
      }), !1, r), t;
    };
  } else
    d = (f) => {
      a();
      const [c, t] = g(f, ["children"]), r = E.context ? x() : document.createElement(n);
      return e == null || e.propsHandler(t), b(r, h(e == null ? void 0 : e.initialProps, t, {
        children: (s && (c == null ? void 0 : c.children)) ?? []
      }), !1, !s), r;
    };
  return d.tagName = n, d.register = a, d;
}
export {
  L as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
