import { sharedConfig as y, children as E, splitProps as g, mergeProps as x, createEffect as k } from "solid-js";
import { getNextElement as b, spread as j } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function L(n, s, e, D) {
  const i = typeof s != "boolean" && s;
  function h() {
    if (!customElements.get(n)) {
      if (i)
        C(n, i);
      else if (e != null && e.define)
        for (const t of Array.isArray(e.define) ? e.define : [e.define])
          t();
    }
  }
  let f;
  if (i) {
    const t = i;
    f = (a) => (h(), () => {
      const d = y.context ? b() : document.createElement(n), c = d.renderRoot === d, l = E(() => a.children), [, r, v] = g(a, ["children"], Object.keys(t.reactive ?? {})), u = Object.getOwnPropertyDescriptors(r);
      for (const m of Object.keys(u)) {
        const o = m.replace(/\.?([A-Z]+)/g, (O, P) => "-" + P.toLowerCase()).replace("_", "-").replace(/^-/, "");
        m !== o && (Object.defineProperty(r, o, u[m]), delete r[m]);
      }
      return j(d, x(r, v, {
        children: (!c && l) ?? [],
        "slotted-children": (c && l.toArray()) ?? []
      }), !1, c), d;
    });
  } else
    f = (t) => (h(), () => {
      const a = E(() => t.children), [d, c] = g(t, ["children"]), l = y.context ? b() : document.createElement(n);
      return k(() => {
        var r;
        (r = e == null ? void 0 : e.propsHandler) == null || r.call(e, c);
      }), j(l, x(e == null ? void 0 : e.initialProps, c, {
        children: (s && a) ?? []
      }), !1, !s), l;
    });
  return f.tagName = n, f.register = h, f;
}
export {
  L as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
