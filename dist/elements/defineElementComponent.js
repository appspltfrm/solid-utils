import { children as b, splitProps as y, createRenderEffect as E, createMemo as g, sharedConfig as j, mergeProps as P } from "solid-js";
import { getNextElement as x, spread as O } from "solid-js/web";
import { registerElement as D } from "./registerElement.js";
function R(r, f, e, p) {
  const i = typeof f != "boolean" && f;
  function h() {
    if (!customElements.get(r)) {
      if (i)
        D(r, i);
      else if (e != null && e.define)
        for (const d of Array.isArray(e.define) ? e.define : [e.define])
          d();
    }
  }
  let l;
  if (i) {
    const d = i;
    l = (o) => {
      h();
      const u = b(() => o.children), [, t, a] = y(o, ["children"], Object.keys(d.reactive ?? {}));
      return E(() => {
        const c = Object.getOwnPropertyDescriptors(t);
        for (const s of Object.keys(c)) {
          const n = v(s);
          s !== n && (Object.defineProperty(t, n, c[s]), delete t[s]);
        }
      }), g(() => {
        const c = j.context ? x() : document.createElement(r), n = c.renderRoot === c ? "slotted-children" : "children";
        return O(c, P(t, a, {
          [n]: u
        }), !1, !1), c;
      });
    };
  } else
    l = (d) => (h(), g(() => {
      const o = b(() => d.children), [u, t] = y(d, ["children"]), a = j.context ? x() : document.createElement(r);
      return E(() => {
        var s;
        (s = e == null ? void 0 : e.propsHandler) == null || s.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const m = v(n);
          m !== n && (Object.defineProperty(t, m, c[n]), delete t[n]);
        }
      }), O(a, P(e == null ? void 0 : e.initialProps, t, {
        children: (f && o) ?? []
      }), !1, !f), a;
    }));
  return l.tagName = r, l.register = h, l;
}
function v(r) {
  return r.includes(":") || r.startsWith("on") ? r : r.replace(/\.?([A-Z]+)/g, (f, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  R as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
