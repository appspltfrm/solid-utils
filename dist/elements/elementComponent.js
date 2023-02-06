import { children as d, splitProps as p, sharedConfig as h } from "solid-js";
import { getNextElement as a, spread as f } from "solid-js/web";
import { camelPropsToDashedAttrs as u } from "./camelPropsToDashedAttrs.js";
import { registerElement as x } from "./registerElement.js";
function b(r, n) {
  x(r, n);
  const i = n, e = (c) => {
    const s = d(() => c.children), [, l, m] = p(c, ["children"], Object.keys(i.reactive ?? {})), t = h.context ? a() : document.createElement(r), o = t.renderRoot === t;
    return f(t, {
      ...u(l),
      ...m,
      children: (!o && s) ?? [],
      "slotted-children": (o && s.toArray()) ?? []
    }, !1, o), t;
  };
  return e.tagName = r, e.configure = () => e, e;
}
export {
  b as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
