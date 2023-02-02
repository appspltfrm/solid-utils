import { children as l, splitProps as m, sharedConfig as p } from "solid-js";
import { getNextElement as h, spread as a } from "solid-js/web";
import { camelPropsToDashedAttrs as f } from "./camelPropsToDashedAttrs.js";
import { registerElement as _ } from "./registerElement.js";
function E(o, r) {
  _(o, r);
  const e = r, t = (n) => {
    const c = l(() => n.children), [, d, i] = m(n, ["children"], e.__reactive ?? []), s = p.context ? h() : document.createElement(o);
    return a(s, {
      ...f(d),
      ...i,
      children: (!e.__noShadow && c) ?? [],
      "slotted-children": (e.__noShadow && c.toArray()) ?? []
    }, !1, !!e.__noShadow), s;
  };
  return t.tagName = o, t.configure = () => t, t;
}
export {
  E as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
