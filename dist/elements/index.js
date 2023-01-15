import { insert as b, createComponent as d, Dynamic as C, mergeProps as v } from "solid-js/web";
import { createRoot as m, createSignal as O, splitProps as E } from "solid-js";
class M extends HTMLElement {
  get renderRoot() {
    return this.shadowRoot ?? this.attachShadow({ mode: "open" });
  }
}
function w(e) {
  return e.children;
}
function P(e) {
  const r = {};
  for (const [s, n] of Object.entries(e))
    r[s.replace(/\.?([A-Z]+)/g, (t, o) => "-" + o.toLowerCase()).replace("_", "-").replace(/^-/, "")] = n;
  return r;
}
function j(e) {
  return Object.keys(e).reduce((s, n) => {
    const t = e[n];
    return s[n] = Object.assign({}, t), f(t.value) && !R(t.value) && !Array.isArray(t.value) && (s[n].value = Object.assign({}, t.value)), Array.isArray(t.value) && (s[n].value = t.value.slice(0)), s;
  }, {});
}
function A(e) {
  return e ? Object.keys(e).reduce((s, n) => {
    const t = e[n];
    return s[n] = f(t) && "value" in t ? t : {
      value: t
    }, s[n].attribute || (s[n].attribute = x(n)), s[n].parse = "parse" in s[n] ? s[n].parse : typeof s[n].value != "string", s;
  }, {}) : {};
}
function S(e) {
  return Object.keys(e).reduce((s, n) => (s[n] = e[n].value, s), {});
}
function k(e, r) {
  const s = j(r);
  return Object.keys(r).forEach((t) => {
    const o = s[t], i = e.getAttribute(o.attribute), c = e[t];
    i && (o.value = o.parse ? h(i) : i), c != null && (o.value = Array.isArray(c) ? c.slice(0) : c), o.reflect && p(e, o.attribute, o.value), Object.defineProperty(e, t, {
      get() {
        return o.value;
      },
      set(a) {
        const g = o.value;
        o.value = a, o.reflect && p(this, o.attribute, o.value);
        for (let u = 0, y = this.__propertyChangedCallbacks.length; u < y; u++)
          this.__propertyChangedCallbacks[u](t, a, g);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function h(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function p(e, r, s) {
  if (s == null || s === !1)
    return e.removeAttribute(r);
  let n = JSON.stringify(s);
  e.__updating[r] = !0, n === "true" && (n = ""), e.setAttribute(r, n), Promise.resolve().then(() => delete e.__updating[r]);
}
function x(e) {
  return e.replace(/\.?([A-Z]+)/g, (r, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function f(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function R(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function K(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let l;
function z() {
  return l;
}
function T(e, r) {
  const s = Object.keys(r);
  return class extends e {
    static get observedAttributes() {
      return s.map((t) => r[t].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = k(this, r);
      const t = S(this.props), o = this.Component, i = l;
      try {
        l = this, this.__initialized = !0, K(o) ? new o(t, {
          element: this
        }) : o(t, {
          element: this
        });
      } finally {
        l = i;
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
        this[t] = r[t].parse ? h(i) : i;
      }
    }
    lookupProp(t) {
      if (r)
        return s.find((o) => t === o || t === r[o].attribute);
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
function $(...e) {
  return e.length === 0 ? (r) => r : e.length === 1 ? e[0] : e.reduce((r, s) => (...n) => r(s(...n)));
}
function L(e, r = {}, s = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: t
  } = s;
  return (o) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let i = customElements.get(e);
    return i ? (i.prototype.Component = o, i) : (i = T(n, A(r)), i.prototype.Component = o, i.prototype.registeredTag = e, customElements.define(e, i, t), i);
  };
}
function F(e) {
  const r = Object.keys(e), s = {};
  for (let n = 0; n < r.length; n++) {
    const [t, o] = O(e[r[n]]);
    Object.defineProperty(s, r[n], {
      get: t,
      set(i) {
        o(() => i);
      }
    });
  }
  return s;
}
function q(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let r = e.parentNode;
  for (; r && !r._$owner && !(r.assignedSlot && r.assignedSlot._$owner); )
    r = r.parentNode;
  return r && r.assignedSlot ? r.assignedSlot._$owner : e._$owner;
}
function B(e) {
  return (r, s) => {
    const { element: n } = s;
    return m((t) => {
      const o = F(r);
      n.addPropertyChangedCallback((c, a) => o[c] = a), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", t();
      });
      const i = e(o, s);
      return b(n.renderRoot, i);
    }, q(n));
  };
}
function _(e, r) {
  if (customElements.get(e))
    return;
  const s = r, n = {};
  for (const i of s.__reactive ?? [])
    n[i] = Object.assign({
      value: void 0
    });
  const t = Object.getOwnPropertyDescriptor(r.prototype, "renderRoot"), o = $(L(e, n, {
    BaseElement: r
  }), B)((i) => {
    const c = z();
    return d(w, {
      get children() {
        return c.template({
          props: i
        });
      }
    });
  });
  t && Object.defineProperty(o.prototype, "renderRoot", t);
}
function Z(e, r) {
  _(e, r);
  const s = r, t = (o) => {
    const [, i, c] = E(o, ["children"], s.__reactive ?? []);
    return d(C, v({
      component: e
    }, () => P(i), c));
  };
  return t.tagName = e, t.events = () => t, t.required = () => t, t;
}
function N(e) {
  return function(r) {
    _(e, r);
  };
}
function G() {
  return (e, r, s) => {
    const n = e.constructor, t = n.__reactive ?? [];
    t.push(r), n.__reactive = t;
  };
}
export {
  M as CustomElement,
  w as Fragment,
  N as customElement,
  Z as elementComponent,
  G as reactive
};
//# sourceMappingURL=index.js.map
