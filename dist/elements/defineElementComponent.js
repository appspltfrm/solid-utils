import { createMemo as b, sharedConfig as E, children as g, splitProps as j, createRenderEffect as x, mergeProps as O } from "solid-js";
import { getNextElement as P, spread as v } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function w(r, d, e, k) {
  const a = typeof d != "boolean" && d;
  function m() {
    if (!customElements.get(r)) {
      if (a)
        C(r, a);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let l;
  if (a) {
    const f = a;
    l = (h) => (m(), b(() => {
      const i = E.context ? P() : document.createElement(r), t = i.renderRoot === i, o = g(() => h.children), [, c, u] = j(h, ["children"], Object.keys(f.reactive ?? {}));
      return x(() => {
        const n = Object.getOwnPropertyDescriptors(c);
        for (const s of Object.keys(n)) {
          const y = D(s);
          s !== y && (Object.defineProperty(c, y, n[s]), delete c[s]);
        }
      }), v(i, O(c, u, {
        children: (!t && o) ?? [],
        "slotted-children": (t && o.toArray()) ?? []
      }), !1, !1), i;
    }));
  } else
    l = (f) => (m(), b(() => {
      const h = g(() => f.children), [i, t] = j(f, ["children"]), o = E.context ? P() : document.createElement(r);
      return x(() => {
        var u;
        (u = e == null ? void 0 : e.propsHandler) == null || u.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = D(n);
          s !== n && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), v(o, O(e == null ? void 0 : e.initialProps, t, {
        children: (d && h) ?? []
      }), !1, !d), o;
    }));
  return l.tagName = r, l.register = m, l;
}
function D(r) {
  return r.includes(":") || r.startsWith("on") ? r : r.replace(/\.?([A-Z]+)/g, (d, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  w as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
