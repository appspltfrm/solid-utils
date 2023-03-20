import { children as b, splitProps as y, createRenderEffect as E, createMemo as g, sharedConfig as j, mergeProps as x } from "solid-js";
import { getNextElement as O, spread as P } from "solid-js/web";
import { registerElement as D } from "./registerElement.js";
function _(r, d, e, C) {
  const i = typeof d != "boolean" && d;
  function h() {
    if (!customElements.get(r)) {
      if (i)
        D(r, i);
      else if (e != null && e.define)
        for (const f of Array.isArray(e.define) ? e.define : [e.define])
          f();
    }
  }
  let l;
  if (i) {
    const f = i;
    l = (o) => {
      h();
      const u = b(() => o.children), [, t, a] = y(o, ["children"], Object.keys(f.reactive ?? {}));
      return E(() => {
        const c = Object.getOwnPropertyDescriptors(t);
        for (const n of Object.keys(c)) {
          const s = v(n);
          n !== s && (Object.defineProperty(t, s, c[n]), delete t[n]);
        }
      }), g(() => {
        const c = j.context ? O() : document.createElement(r), n = c.renderRoot === c;
        return P(c, x(t, a, {
          children: (!n && u()) ?? [],
          "slotted-children": (n && u()) ?? []
        }), !1, !1), c;
      });
    };
  } else
    l = (f) => (h(), g(() => {
      const o = b(() => f.children), [u, t] = y(f, ["children"]), a = j.context ? O() : document.createElement(r);
      return E(() => {
        var n;
        (n = e == null ? void 0 : e.propsHandler) == null || n.call(e, t);
        const c = Object.getOwnPropertyDescriptors(t);
        for (const s of Object.keys(c)) {
          const m = v(s);
          m !== s && (Object.defineProperty(t, m, c[s]), delete t[s]);
        }
      }), P(a, x(e == null ? void 0 : e.initialProps, t, {
        children: (d && o) ?? []
      }), !1, !d), a;
    }));
  return l.tagName = r, l.register = h, l;
}
function v(r) {
  return r.includes(":") || r.startsWith("on") ? r : r.replace(/\.?([A-Z]+)/g, (d, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
