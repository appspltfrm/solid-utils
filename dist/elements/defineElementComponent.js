import { sharedConfig as u, children as a, splitProps as E, mergeProps as x, createEffect as b } from "solid-js";
import { getNextElement as g, spread as y } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function R(c, l, e, P) {
  const m = typeof l != "boolean" && l;
  function h() {
    if (!customElements.get(c)) {
      if (m)
        C(c, m);
      else if (e != null && e.define)
        for (const r of Array.isArray(e.define) ? e.define : [e.define])
          r();
    }
  }
  let n;
  if (m) {
    const r = m;
    n = (i) => (h(), () => {
      const f = u.context ? g() : document.createElement(c), t = f.renderRoot === f, d = a(() => i.children), [, s, v] = E(i, ["children"], Object.keys(r.reactive ?? {}));
      return y(f, x(s, v, {
        children: (!t && d) ?? [],
        slottedChildren: (t && d.toArray()) ?? []
      }), !1, t), f;
    });
  } else
    n = (r) => (h(), () => {
      const i = a(() => r.children), [f, t] = E(r, ["children"]), d = u.context ? g() : document.createElement(c);
      return b(() => {
        var s;
        (s = e == null ? void 0 : e.propsHandler) == null || s.call(e, t);
      }), y(d, x(e == null ? void 0 : e.initialProps, t, {
        children: (l && i) ?? []
      }), !1, !l), d;
    });
  return n.tagName = c, n.register = h, n;
}
export {
  R as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
