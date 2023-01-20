import { insert as f, createComponent as y, memo as h, template as v, Dynamic as m, mergeProps as w } from "solid-js/web";
import { createRoot as S, createSignal as O, splitProps as g, children as E } from "solid-js";
class I extends HTMLElement {
}
function A(e) {
  return e.children;
}
function j(e) {
  const r = {};
  for (const [n, s] of Object.entries(e))
    r[n.replace(/\.?([A-Z]+)/g, (t, o) => "-" + o.toLowerCase()).replace("_", "-").replace(/^-/, "")] = s;
  return r;
}
function P(e) {
  return Object.keys(e).reduce((n, s) => {
    const t = e[s];
    return n[s] = Object.assign({}, t), C(t.value) && !$(t.value) && !Array.isArray(t.value) && (n[s].value = Object.assign({}, t.value)), Array.isArray(t.value) && (n[s].value = t.value.slice(0)), n;
  }, {});
}
function k(e) {
  return e ? Object.keys(e).reduce((n, s) => {
    const t = e[s];
    return n[s] = C(t) && "value" in t ? t : {
      value: t
    }, n[s].attribute || (n[s].attribute = R(s)), n[s].parse = "parse" in n[s] ? n[s].parse : typeof n[s].value != "string", n;
  }, {}) : {};
}
function x(e) {
  return Object.keys(e).reduce((n, s) => (n[s] = e[s].value, n), {});
}
function K(e, r) {
  const n = P(r);
  return Object.keys(r).forEach((t) => {
    const o = n[t], i = e.getAttribute(o.attribute), l = e[t];
    i && (o.value = o.parse ? b(i) : i), l != null && (o.value = Array.isArray(l) ? l.slice(0) : l), o.reflect && _(e, o.attribute, o.value), Object.defineProperty(e, t, {
      get() {
        return o.value;
      },
      set(a) {
        const d = o.value;
        o.value = a, o.reflect && _(this, o.attribute, o.value);
        for (let u = 0, p = this.__propertyChangedCallbacks.length; u < p; u++)
          this.__propertyChangedCallbacks[u](t, a, d);
      },
      enumerable: !0,
      configurable: !0
    });
  }), n;
}
function b(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function _(e, r, n) {
  if (n == null || n === !1)
    return e.removeAttribute(r);
  let s = JSON.stringify(n);
  e.__updating[r] = !0, s === "true" && (s = ""), e.setAttribute(r, s), Promise.resolve().then(() => delete e.__updating[r]);
}
function R(e) {
  return e.replace(/\.?([A-Z]+)/g, (r, n) => "-" + n.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function C(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function $(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function z(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let c;
function T() {
  return c;
}
function F() {
  Object.defineProperty(c, "renderRoot", {
    value: c
  });
}
function L(e, r) {
  const n = Object.keys(r);
  return class extends e {
    static get observedAttributes() {
      return n.map((t) => r[t].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = K(this, r);
      const t = x(this.props), o = this.Component, i = c;
      try {
        c = this, this.__initialized = !0, z(o) ? new o(t, {
          element: this
        }) : o(t, {
          element: this
        });
      } finally {
        c = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let t = null;
      for (; t = this.__releaseCallbacks.pop(); )
        t(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(t, o, i) {
      if (this.__initialized && !this.__updating[t] && (t = this.lookupProp(t), t in r)) {
        if (i == null && !this[t])
          return;
        this[t] = r[t].parse ? b(i) : i;
      }
    }
    lookupProp(t) {
      if (r)
        return n.find((o) => t === o || t === r[o].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(t) {
      this.__releaseCallbacks.push(t);
    }
    addPropertyChangedCallback(t) {
      this.__propertyChangedCallbacks.push(t);
    }
  };
}
function M(...e) {
  return e.length === 0 ? (r) => r : e.length === 1 ? e[0] : e.reduce((r, n) => (...s) => r(n(...s)));
}
function q(e, r = {}, n = {}) {
  const {
    BaseElement: s = HTMLElement,
    extension: t
  } = n;
  return (o) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let i = customElements.get(e);
    return i ? (i.prototype.Component = o, i) : (i = L(s, k(r)), i.prototype.Component = o, i.prototype.registeredTag = e, customElements.define(e, i, t), i);
  };
}
function B(e) {
  const r = Object.keys(e), n = {};
  for (let s = 0; s < r.length; s++) {
    const [t, o] = O(e[r[s]]);
    Object.defineProperty(n, r[s], {
      get: t,
      set(i) {
        o(() => i);
      }
    });
  }
  return n;
}
function H(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let r = e.parentNode;
  for (; r && !r._$owner && !(r.assignedSlot && r.assignedSlot._$owner); )
    r = r.parentNode;
  return r && r.assignedSlot ? r.assignedSlot._$owner : e._$owner;
}
function J(e) {
  return (r, n) => {
    const { element: s } = n;
    return S((t) => {
      const o = B(r);
      s.addPropertyChangedCallback((l, a) => o[l] = a), s.addReleaseCallback(() => {
        s.renderRoot.textContent = "", t();
      });
      const i = e(o, n);
      return f(s.renderRoot, i);
    }, H(s));
  };
}
const N = /* @__PURE__ */ v("<style></style>", 2);
function V(e, r) {
  if (customElements.get(e))
    return;
  const n = r, s = {
    __children: void 0
  };
  for (const t of n.__reactive ?? [])
    s[t] = Object.assign({
      value: void 0
    });
  M(q(e, s, {
    BaseElement: r
  }), J)((t) => {
    const o = !n.__noShadow, i = o && n.__shadowStyles;
    o || F();
    const [l, a] = g(t, ["__children"]), d = T();
    return y(A, {
      get children() {
        return [h(() => i && (typeof i == "string" ? [i] : i).map((u) => (() => {
          const p = N.cloneNode(!0);
          return f(p, u), p;
        })())), h(() => d.template({
          props: a,
          children: (l == null ? void 0 : l.__children) ?? []
        }))];
      }
    });
  });
}
function U(e, r) {
  V(e, r);
  const n = r, t = (o) => {
    const i = E(() => o.children), [, l, a] = g(o, ["children"], n.__reactive ?? []);
    return y(m, w({
      component: e
    }, () => j(l), a, {
      get __children() {
        return i.toArray();
      },
      get children() {
        return !n.__noShadow && i;
      }
    }));
  };
  return t.tagName = e, t.events = () => t, t.required = () => t, t;
}
function W() {
  return (e, r, n) => {
    const s = e.constructor, t = s.__reactive ?? [];
    t.push(r), s.__reactive = t;
  };
}
function X(e, r) {
  return function(n) {
    n.__noShadow = e === "element", e === "shadow" && (n.__shadowStyles = r == null ? void 0 : r.styles);
  };
}
export {
  I as C,
  A as F,
  W as a,
  X as b,
  U as e,
  V as r
};
//# sourceMappingURL=renderRoot-698dfa65.mjs.map
