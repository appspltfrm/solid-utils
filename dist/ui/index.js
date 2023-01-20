import { createComponent as z, Dynamic as g, getOwner as w, insert as y, spread as x, mergeProps as P, template as h } from "solid-js/web";
import { e as $, b as C, C as D, a as u } from "../renderRoot-698dfa65.mjs";
import "solid-js";
import { i as E } from "../innerProp-e0175551.mjs";
import "@co.mmons/js-utils/core";
const O = `:host{color:red}:host button{color:inherit}
`;
var c, s, m, f, a, b, p;
const j = /* @__PURE__ */ h("<slot></slot>", 2), B = /* @__PURE__ */ h("<label></label>", 2);
function d(l, i, t, r) {
  t && Object.defineProperty(l, i, { enumerable: t.enumerable, configurable: t.configurable, writable: t.writable, value: t.initializer ? t.initializer.call(r) : void 0 });
}
function _(l, i, t, r, n) {
  var e = {};
  return Object.keys(r).forEach(function(o) {
    e[o] = r[o];
  }), e.enumerable = !!e.enumerable, e.configurable = !!e.configurable, ("value" in e || e.initializer) && (e.writable = !0), e = t.slice().reverse().reduce(function(o, v) {
    return v(l, i, o) || o;
  }, e), n && e.initializer !== void 0 && (e.value = e.initializer ? e.initializer.call(n) : void 0, e.initializer = void 0), e.initializer === void 0 && (Object.defineProperty(l, i, e), e = null), e;
}
let N = (c = C("shadow", {
  styles: O
}), s = u(), m = u(), c(f = (a = class extends D {
  constructor(...i) {
    super(...i), d(this, "href", b, this), d(this, "text", p, this);
  }
  template({
    props: i
  }) {
    const t = i.href ? "a" : "button", {
      text: r
    } = i;
    return z(g, {
      component: t,
      get children() {
        const n = j.cloneNode(!0);
        return n._$owner = w(), y(n, r && (() => {
          const e = B.cloneNode(!0);
          return x(e, P(() => E(r)), !1, !1), e;
        })()), n;
      }
    });
  }
}, b = _(a.prototype, "href", [s], {
  configurable: !0,
  enumerable: !0,
  writable: !0,
  initializer: null
}), p = _(a.prototype, "text", [m], {
  configurable: !0,
  enumerable: !0,
  writable: !0,
  initializer: null
}), a)) || f);
const H = $("appx-button", N);
export {
  H as Button,
  N as ButtonElement
};
//# sourceMappingURL=index.js.map
