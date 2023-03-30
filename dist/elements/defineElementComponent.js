import { children as p, splitProps as x, createRenderEffect as b, createMemo as E, sharedConfig as P, mergeProps as g } from "solid-js";
import { getNextElement as j, spread as y } from "solid-js/web";
import { registerElement as $ } from "./registerElement.js";
function w(r, l, e, C) {
  const i = typeof l != "boolean" && l;
  function u() {
    if (!customElements.get(r)) {
      if (i)
        $(r, i);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let d;
  if (i) {
    const f = i;
    d = (o) => {
      u();
      const m = p(() => o.children), [, t] = x(o, ["children"]);
      return b(() => {
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = f.reactive[n] ? `prop:${n}` : O(n);
          n !== s && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), E(() => {
        const c = P.context ? j() : document.createElement(r), s = c.renderRoot === c ? "prop:slottedChildren" : "children";
        return y(c, g(t, {
          [s]: m
        }), !1, !1), c;
      });
    };
  } else
    d = (f) => (u(), E(() => {
      const o = p(() => f.children), [m, t] = x(f, ["children"]), c = P.context ? j() : document.createElement(r);
      return b(() => {
        var s;
        (s = e == null ? void 0 : e.propsHandler) == null || s.call(e, t);
        const n = Object.getOwnPropertyDescriptors(t);
        for (const a of Object.keys(n)) {
          const h = O(a);
          h !== a && (Object.defineProperty(t, h, n[a]), delete t[a]);
        }
      }), y(c, g(e == null ? void 0 : e.initialProps, t, {
        children: (l && o) ?? []
      }), !1, !l), c;
    }));
  return d.tagName = r, d.register = u, d;
}
const v = ["class", "className", "classList", "ref", "style"];
function O(r) {
  return r.includes(":") || r.startsWith("on") || v.includes(r) ? r : r.includes("-") ? `attr:${r}` : `prop:${r}`;
}
export {
  w as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
