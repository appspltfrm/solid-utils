import { children as E, splitProps as b, createRenderEffect as g, createMemo as j, sharedConfig as y, mergeProps as P } from "solid-js";
import { getNextElement as x, spread as O } from "solid-js/web";
import { registerElement as C } from "./registerElement.js";
function _(t, d, e, D) {
  const i = typeof d != "boolean" && d;
  function a() {
    if (!customElements.get(t)) {
      if (i)
        C(t, i);
      else if (e != null && e.define)
        for (const n of Array.isArray(e.define) ? e.define : [e.define])
          n();
    }
  }
  let f;
  return i ? f = (n) => {
    a();
    const h = E(() => n.children), [, l] = b(n, ["children"]);
    return g(() => {
      const r = Object.getOwnPropertyDescriptors(l);
      for (const c of Object.keys(r)) {
        const s = p(c);
        c !== s && (Object.defineProperty(l, s, r[c]), delete l[c]);
      }
    }), j(() => {
      const r = y.context ? x() : document.createElement(t), s = r.renderRoot === r ? "slotted-children" : "children";
      return O(r, P(l, {
        [s]: h
      }), !1, !1), r;
    });
  } : f = (n) => (a(), j(() => {
    const h = E(() => n.children), [l, r] = b(n, ["children"]), c = y.context ? x() : document.createElement(t);
    return g(() => {
      var u;
      (u = e == null ? void 0 : e.propsHandler) == null || u.call(e, r);
      const s = Object.getOwnPropertyDescriptors(r);
      for (const o of Object.keys(s)) {
        const m = p(o);
        m !== o && (Object.defineProperty(r, m, s[o]), delete r[o]);
      }
    }), O(c, P(e == null ? void 0 : e.initialProps, r, {
      children: (d && h) ?? []
    }), !1, !d), c;
  })), f.tagName = t, f.register = a, f;
}
function p(t) {
  return t.includes(":") || t.startsWith("on") ? t : t.replace(/\.?([A-Z]+)/g, (d, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  _ as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
