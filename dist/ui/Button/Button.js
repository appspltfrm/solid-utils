import { createComponent as h, Dynamic as g, getOwner as w, insert as y, spread as x, mergeProps as P, template as v } from "solid-js/web";
import { CustomElement as $ } from "../../elements/CustomElement.js";
import "solid-js/h/jsx-runtime";
import { elementComponent as D } from "../../elements/elementComponent.js";
import "component-register";
import "solid-element";
import "solid-js";
import { reactive as u } from "../../elements/decorators/reactive.js";
import { renderRoot as E } from "../../elements/decorators/renderRoot.js";
import { innerProp as O } from "../../utils/innerProp.js";
import j from "./Button.scss.js";
var m, c, f, s, a, p, b;
const B = /* @__PURE__ */ v("<slot></slot>", 2), C = /* @__PURE__ */ v("<label></label>", 2);
function d(l, r, t, i) {
  t && Object.defineProperty(l, r, { enumerable: t.enumerable, configurable: t.configurable, writable: t.writable, value: t.initializer ? t.initializer.call(i) : void 0 });
}
function _(l, r, t, i, n) {
  var e = {};
  return Object.keys(i).forEach(function(o) {
    e[o] = i[o];
  }), e.enumerable = !!e.enumerable, e.configurable = !!e.configurable, ("value" in e || e.initializer) && (e.writable = !0), e = t.slice().reverse().reduce(function(o, z) {
    return z(l, r, o) || o;
  }, e), n && e.initializer !== void 0 && (e.value = e.initializer ? e.initializer.call(n) : void 0, e.initializer = void 0), e.initializer === void 0 && (Object.defineProperty(l, r, e), e = null), e;
}
let N = (m = E("shadow", {
  styles: j
}), c = u(), f = u(), m(s = (a = class extends $ {
  constructor(...r) {
    super(...r), d(this, "href", p, this), d(this, "text", b, this);
  }
  template({
    props: r
  }) {
    const t = r.href ? "a" : "button", {
      text: i
    } = r;
    return h(g, {
      component: t,
      get children() {
        const n = B.cloneNode(!0);
        return n._$owner = w(), y(n, i && (() => {
          const e = C.cloneNode(!0);
          return x(e, P(() => O(i)), !1, !1), e;
        })()), n;
      }
    });
  }
}, p = _(a.prototype, "href", [c], {
  configurable: !0,
  enumerable: !0,
  writable: !0,
  initializer: null
}), b = _(a.prototype, "text", [f], {
  configurable: !0,
  enumerable: !0,
  writable: !0,
  initializer: null
}), a)) || s);
const Q = D("appx-button", N);
export {
  Q as Button,
  N as ButtonElement
};
//# sourceMappingURL=Button.js.map
