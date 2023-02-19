var A = Object.defineProperty;
var D = (e, n, t) => n in e ? A(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var g = (e, n, t) => (D(e, typeof n != "symbol" ? n + "" : n, t), t);
import { createSignal as E } from "solid-js";
import { createStore as S } from "solid-js/store";
const i = /* @__PURE__ */ new WeakMap();
class a {
  constructor() {
    g(this, "value");
    g(this, "onDelete");
  }
}
function u(e, n) {
  if (e && n in e)
    throw new Error(`Element var ${String(n)} already exists`);
}
function h(e, n) {
  var r;
  const t = (r = i.get(e)) == null ? void 0 : r[n];
  return t instanceof a ? t.value : t;
}
function f(e, n, t, r) {
  let s = i.get(e);
  s || (s = {}, i.set(e, s), e.addDisconnectedCallback(() => {
    var v;
    const l = i.get(e);
    if (l)
      for (const c of Object.values(l))
        c instanceof a && ((v = c.onDelete) == null || v.call(c));
    i.delete(e);
  }));
  let o = t;
  r != null && r.onDelete && (o = new a(), o.value = t, o.onDelete = r.onDelete), s[n] = o;
}
function b(e, n) {
  var r;
  const t = i.get(e);
  if (t) {
    const s = t[n];
    s instanceof a && ((r = s.onDelete) == null || r.call(s)), delete t[n];
  }
}
function d(e, n, t) {
  const r = i.get(e);
  u(r, n);
  const s = E(t);
  return f(e, n, s), s;
}
function k(e, n) {
  var s;
  let t = (s = i.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [() => {
  }, (o) => {
    const [, l] = d(e, n);
    return l(o);
  }];
}
function j(e, n) {
  var s;
  let t = (s = i.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r[0] : () => {
  };
}
function C(e, n, t) {
  var o;
  let r = (o = i.get(e)) == null ? void 0 : o[n];
  r instanceof a && (r = r.value);
  let s = r;
  s ? Array.isArray(s) && s[1](t) : d(e, n, t);
}
function M(e, n) {
  b(e, n);
}
function N(e, n, t) {
  const r = i.get(e);
  u(r, n);
  const s = E(), o = t.subscribe({
    next: (l) => s[1](() => l),
    error: (l) => {
      throw l;
    }
  });
  return f(e, n, s, { onDelete: "unsubscribe" in o ? o.unsubscribe : o }), s[0];
}
function O(e, n) {
  b(e, n);
}
function W(e, n) {
  var s;
  let t = (s = i.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [
    void 0,
    (o) => {
      const [, l] = y(e, n);
      return l(o);
    }
  ];
}
function $(e, n, t) {
  var o;
  let r = (o = i.get(e)) == null ? void 0 : o[n];
  r instanceof a && (r = r.value);
  const s = r;
  if (s && Array.isArray(s))
    return s[1](t);
  y(e, n, t);
}
function q(e, n) {
  var s;
  let t = (s = i.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  if (r && Array.isArray(r))
    return r[0];
}
function y(e, n, t) {
  const r = i.get(e);
  u(r, n);
  const s = S(t);
  return f(e, n, s), s;
}
function z(e, n, t) {
  const r = i.get(e);
  u(r, n);
  const s = S({}), o = t.subscribe({
    next: (l) => s[1](l),
    error: (l) => {
      throw l;
    }
  });
  return f(e, n, s, { onDelete: "unsubscribe" in o ? o.unsubscribe : o }), s[0];
}
export {
  d as createElementSignal,
  y as createElementStore,
  M as deleteElementSignal,
  O as deleteElementStore,
  b as deleteElementVar,
  k as getElementSignal,
  W as getElementStore,
  h as getElementVar,
  N as loadElementSignal,
  z as loadElementStore,
  C as setElementSignal,
  $ as setElementStore,
  f as setElementVar,
  j as useElementSignal,
  q as useElementStore
};
//# sourceMappingURL=vars.js.map
