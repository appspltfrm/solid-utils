import { sharedConfig as b, children as E, splitProps as g, createRenderEffect as j, mergeProps as x } from "solid-js";
import { getNextElement as O, spread as P } from "solid-js/web";
import { registerElement as D } from "./registerElement.js";
function _(r, f, e, k) {
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
  let l;
  if (a) {
    const d = a;
    l = (u) => (m(), () => {
      const i = b.context ? O() : document.createElement(r), t = i.renderRoot === i, o = E(() => u.children), [, c, h] = g(u, ["children"], Object.keys(d.reactive ?? {}));
      return j(() => {
        const n = Object.getOwnPropertyDescriptors(c);
        for (const s of Object.keys(n)) {
          const y = v(s);
          s !== y && (Object.defineProperty(c, y, n[s]), delete c[s]);
        }
      }), P(i, x(c, h, {
        children: (!t && o) ?? [],
        "slotted-children": (t && o.toArray()) ?? []
      }), !1, t), i;
    });
  } else
    l = (d) => (m(), () => {
      const u = E(() => d.children), [i, t] = g(d, ["children"]), o = b.context ? O() : document.createElement(r);
      return j(() => {
        var h;
        (h = e == null ? void 0 : e.propsHandler) == null || h.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = v(n);
          s !== n && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), P(o, x(e == null ? void 0 : e.initialProps, t, {
        children: (f && u) ?? []
      }), !1, !f), o;
    });
  return l.tagName = r, l.register = m, l;
}
function v(r) {
  return r.includes(":") ? r : r.replace(/\.?([A-Z]+)/g, (f, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
