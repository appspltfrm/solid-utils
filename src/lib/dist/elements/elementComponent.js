import { createComponent as p, Dynamic as s, mergeProps as l } from "solid-js/web";
import { children as d, splitProps as h } from "solid-js";
import { camelPropsToDashedAttrs as a } from "./camelPropsToDashedAttrs.js";
import { registerElement as u } from "./registerElement.js";
function x(r, t) {
  u(r, t);
  const n = t, e = (o) => {
    const m = d(() => o.children), [, c, i] = h(o, ["children"], n.__reactive ?? []);
    return p(s, l({
      component: r
    }, () => a(c), i, {
      get __children() {
        return m.toArray();
      },
      get children() {
        return !n.__noShadow && m;
      }
    }));
  };
  return e.tagName = r, e.events = () => e, e.required = () => e, e;
}
export {
  x as elementComponent
};
//# sourceMappingURL=elementComponent.js.map
