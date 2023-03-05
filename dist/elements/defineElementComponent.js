import { sharedConfig as b, children as E, splitProps as g, createRenderEffect as j, mergeProps as x } from "solid-js";
import { getNextElement as O, spread as P } from "solid-js/web";
import { registerElement as D } from "./registerElement.js";
function _(r, f, e, C) {
  const a = typeof f != "boolean" && f;
  function m() {
    if (!customElements.get(r)) {
      if (a)
        D(r, a);
      else if (e != null && e.define)
        for (const d of Array.isArray(e.define) ? e.define : [e.define])
          d();
    }
  }
  let i;
  if (a) {
    const d = a;
    i = (h) => (m(), () => {
      const l = b.context ? O() : document.createElement(r), t = l.renderRoot === l, o = E(() => h.children), [, c, u] = g(h, ["children"], Object.keys(d.reactive ?? {}));
      return j(() => {
        const n = Object.getOwnPropertyDescriptors(c);
        for (const s of Object.keys(n)) {
          const y = v(s);
          s !== y && (Object.defineProperty(c, y, n[s]), delete c[s]);
        }
      }), P(l, x(c, u, {
        children: (!t && o) ?? [],
        "slotted-children": (t && o.toArray()) ?? []
      }), !1, t), l;
    });
  } else
    i = (d) => (m(), () => {
      const h = E(() => d.children), [l, t] = g(d, ["children"]), o = b.context ? O() : document.createElement(r);
      return j(() => {
        var u;
        (u = e == null ? void 0 : e.propsHandler) == null || u.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = v(n);
          s !== n && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), P(o, x(e == null ? void 0 : e.initialProps, t, {
        children: (f && h) ?? []
      }), !1, !f), o;
    });
  return i.tagName = r, i.register = m, i;
}
function v(r) {
  return r.includes(":") || r.startsWith("on") ? r : r.replace(/\.?([A-Z]+)/g, (f, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
