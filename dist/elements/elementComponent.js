import { createMemo as p, children as h, splitProps as f, sharedConfig as u } from "solid-js";
import { getNextElement as a, spread as x } from "solid-js/web";
import { camelPropsToDashedAttrs as E } from "./camelPropsToDashedAttrs.js";
import { registerElement as i } from "./registerElement.js";
function k(e, o) {
  const l = o, t = (c) => p(() => {
    customElements.get(e) || i(e, o);
    const s = h(() => c.children), [, m, d] = f(c, ["children"], Object.keys(l.reactive ?? {})), r = u.context ? a() : document.createElement(e), n = r.renderRoot === r;
    return x(r, {
      ...E(m),
      ...d,
      children: (!n && s) ?? [],
      "slotted-children": (n && s.toArray()) ?? []
    }, !1, n), r;
  });
  return t.tagName = e, t.configure = () => t, t.register = () => i(e, o), t;
}
export {
  k as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
