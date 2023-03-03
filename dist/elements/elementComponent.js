import { sharedConfig as g, children as u, splitProps as x, mergeProps as m } from "solid-js";
import { getNextElement as y, spread as C } from "solid-js/web";
import { registerElement as f } from "./registerElement.js";
function O(e, s) {
  const h = s, t = (l) => {
    customElements.get(e) || f(e, s);
    const n = g.context ? y() : document.createElement(e), r = n.renderRoot === n, c = u(() => l.children), [, o, d] = x(l, ["children"], Object.keys(h.reactive ?? {}));
    for (const i of Object.keys(o)) {
      const p = i.replace(/\.?([A-Z]+)/g, (b, a) => "-" + a.toLowerCase()).replace("_", "-").replace(/^-/, "");
      i !== p && Object.defineProperty(o, p, {
        get: () => o[i]
      });
    }
    return m(o, d, {
      children: (!r && c) ?? [],
      "slotted-children": (r && c.toArray()) ?? []
    }), C(n, m(o, d, {
      children: (!r && c) ?? [],
      "slotted-children": (r && c.toArray()) ?? []
    }), !1, r), n;
  };
  return t.tagName = e, t.configure = () => t, t.register = () => f(e, s), t;
}
export {
  O as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
