import { sharedConfig as E, children as x, splitProps as y, createEffect as u, mergeProps as g } from "solid-js";
import { getNextElement as b, spread as v } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function _(c, s, e, H) {
  const l = typeof s != "boolean" && s;
  function m() {
    if (!customElements.get(c)) {
      if (l)
        C(c, l);
      else if (e != null && e.define)
        for (const t of Array.isArray(e.define) ? e.define : [e.define])
          t();
    }
  }
  let f;
  if (l) {
    const t = l;
    f = (i) => (m(), () => {
      const r = E.context ? b() : document.createElement(c), n = r.renderRoot === r, d = x(() => i.children), [, h, j] = y(i, ["children"], Object.keys(t.reactive ?? {}));
      return u(() => {
        for (const o of Object.keys(h)) {
          const a = h[o], k = r[o];
          a !== k && (r[o] = a);
        }
      }), u(() => {
        r.slottedChildren = (n && d.toArray()) ?? [];
      }), v(r, g(j, {
        children: (!n && d) ?? []
      }), !1, n), r;
    });
  } else
    f = (t) => (m(), () => {
      const i = x(() => t.children), [r, n] = y(t, ["children"]), d = E.context ? b() : document.createElement(c);
      return u(() => {
        e == null || e.propsHandler(n);
      }), v(d, g(e == null ? void 0 : e.initialProps, n, {
        children: (s && i) ?? []
      }), !1, !s), d;
    });
  return f.tagName = c, f.register = m, f;
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
