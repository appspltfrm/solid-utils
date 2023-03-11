import { createMemo as b, sharedConfig as E, children as g, splitProps as j, createRenderEffect as x, mergeProps as O } from "solid-js";
import { getNextElement as P, spread as v } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function w(r, f, e, k) {
  const a = typeof f != "boolean" && f;
  function m() {
    if (!customElements.get(r)) {
      if (a)
        C(r, a);
      else if (e != null && e.define)
        for (const d of Array.isArray(e.define) ? e.define : [e.define])
          d();
    }
  }
  let i;
  if (a) {
    const d = a;
    i = (h) => (m(), b(() => {
      const l = E.context ? P() : document.createElement(r), t = l.renderRoot === l, o = g(() => h.children), [, c, u] = j(h, ["children"], Object.keys(d.reactive ?? {}));
      return x(() => {
        const n = Object.getOwnPropertyDescriptors(c);
        for (const s of Object.keys(n)) {
          const y = D(s);
          s !== y && (Object.defineProperty(c, y, n[s]), delete c[s]);
        }
      }), v(l, O(c, u, {
        children: (!t && o) ?? [],
        "slotted-children": (t && o.toArray()) ?? []
      }), !1, t), l;
    }));
  } else
    i = (d) => (m(), b(() => {
      const h = g(() => d.children), [l, t] = j(d, ["children"]), o = E.context ? P() : document.createElement(r);
      return x(() => {
        var u;
        (u = e == null ? void 0 : e.propsHandler) == null || u.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = D(n);
          s !== n && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), v(o, O(e == null ? void 0 : e.initialProps, t, {
        children: (f && h) ?? []
      }), !1, !f), o;
    }));
  return i.tagName = r, i.register = m, i;
}
function D(r) {
  return r.includes(":") || r.startsWith("on") ? r : r.replace(/\.?([A-Z]+)/g, (f, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  w as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
