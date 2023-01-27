import { createComponent as p, Dynamic as l, mergeProps as s } from "solid-js/web";
import { children as d, splitProps as h } from "solid-js";
import { camelPropsToDashedAttrs as u } from "./camelPropsToDashedAttrs.js";
import { registerElement as a } from "./registerElement.js";
function y(r, t) {
  a(r, t);
  const n = t, e = (o) => {
    const c = d(() => o.children), [, m, i] = h(o, ["children"], n.__reactive ?? []);
    return p(l, s({
      component: r
    }, () => u(m), i, {
      get __children() {
        return c.toArray();
      },
      get children() {
        return !n.__noShadow && c;
      }
    }));
  };
  return e.tagName = r, e.configure = () => e, e;
}
export {
  y as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
