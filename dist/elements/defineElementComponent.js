import { sharedConfig as a, children as k, splitProps as E, createEffect as x, mergeProps as y } from "solid-js";
import { getNextElement as g, spread as b } from "solid-js/web";
import { registerElement as P } from "./registerElement.js";
function p(c, d, e, C) {
  const s = typeof d != "boolean" && d;
  function i() {
    if (!customElements.get(c)) {
      if (s)
        P(c, s);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let n;
  if (s) {
    const f = s;
    n = (l) => (i(), () => {
      const r = a.context ? g() : document.createElement(c), t = r.renderRoot === r, o = k(() => l.children), [, h, v] = E(l, ["children"], Object.keys(f.reactive ?? {}));
      return x(() => {
        for (const m of Object.keys(h)) {
          const u = h[m], j = r[m];
          u !== j && (r[m] = u);
        }
      }), x(() => {
        r.slottedChildren = (t && o.toArray()) ?? [];
      }), b(r, y(v, {
        children: (!t && o) ?? []
      }), !1, t), r;
    });
  } else
    n = (f) => {
      i();
      const [l, r] = E(f, ["children"]), t = a.context ? g() : document.createElement(c);
      return e == null || e.propsHandler(r), b(t, y(e == null ? void 0 : e.initialProps, r, {
        children: (d && l.children) ?? []
      }), !1, !d), t;
    };
  return n.tagName = c, n.register = i, n;
}
export {
  p as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
