import { children as p, splitProps as h, sharedConfig as f } from "solid-js";
import { getNextElement as u, spread as a } from "solid-js/web";
import { camelPropsToDashedAttrs as x } from "./camelPropsToDashedAttrs.js";
import { registerElement as i } from "./registerElement.js";
function j(e, r) {
  const l = r, t = (c) => {
    customElements.get(e) || i(e, r);
    const s = p(() => c.children), [, d, m] = h(c, ["children"], Object.keys(l.reactive ?? {})), o = f.context ? u() : document.createElement(e), n = o.renderRoot === o;
    return a(o, {
      ...x(d),
      ...m,
      children: (!n && s) ?? [],
      "slotted-children": (n && s.toArray()) ?? []
    }, !1, n), o;
  };
  return t.tagName = e, t.configure = () => t, t.register = () => i(e, r), t;
}
export {
  j as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
