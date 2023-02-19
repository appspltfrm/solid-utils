var A = Object.defineProperty;
var D = (e, n, t) => n in e ? A(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var v = (e, n, t) => (D(e, typeof n != "symbol" ? n + "" : n, t), t);
import { createSignal as E } from "solid-js";
import { createStore as S } from "solid-js/store";
const l = /* @__PURE__ */ new WeakMap();
class c {
  constructor() {
    v(this, "value");
    v(this, "onDelete");
  }
}
function f(e, n) {
  if (e && n in e)
    throw new Error(`Element var ${String(n)} already exists`);
}
function h(e, n) {
  var r;
  const t = (r = l.get(e)) == null ? void 0 : r[n];
  return t instanceof c ? t.value : t;
}
function g(e, n, t, r) {
  let s = l.get(e);
  s || (s = {}, l.set(e, s), e.addDisconnectedCallback(() => {
    var o;
    const a = l.get(e);
    if (a)
      for (const u of Object.values(a))
        u instanceof c && ((o = u.onDelete) == null || o.call(u));
    l.delete(e);
  }));
  let i = t;
  r != null && r.onDelete && (i = new c(), i.value = t, i.onDelete = r.onDelete), s[n] = i;
}
function b(e, n) {
  var r;
  const t = l.get(e);
  if (t) {
    const s = t[n];
    s instanceof c && ((r = s.onDelete) == null || r.call(s)), delete t[n];
  }
}
function d(e, n, t) {
  const r = l.get(e);
  f(r, n);
  const s = E(t);
  return g(e, n, s), s;
}
function k(e, n) {
  var s;
  let t = (s = l.get(e)) == null ? void 0 : s[n];
  t instanceof c && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [() => {
  }, (i) => {
    const [, a] = d(e, n);
    return a(i);
  }];
}
function j(e, n) {
  var s;
  let t = (s = l.get(e)) == null ? void 0 : s[n];
  t instanceof c && (t = t.value);
  const r = t;
  if (r && Array.isArray(r))
    return r[0]();
}
function C(e, n, t) {
  var i;
  let r = (i = l.get(e)) == null ? void 0 : i[n];
  r instanceof c && (r = r.value);
  let s = r;
  s ? Array.isArray(s) && s[1](t) : d(e, n, t);
}
function M(e, n) {
  b(e, n);
}
function N(e, n, t, r) {
  const s = l.get(e);
  f(s, n);
  const i = E(), a = t.subscribe({
    next: (o) => i[1](() => o),
    error: (o) => {
      if (r != null && r.onError)
        r.onError(o);
      else
        throw o;
    }
  });
  return g(e, n, i, { onDelete: "unsubscribe" in a ? a.unsubscribe : a }), i[0];
}
function O(e, n) {
  b(e, n);
}
function W(e, n) {
  var s;
  let t = (s = l.get(e)) == null ? void 0 : s[n];
  t instanceof c && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [
    void 0,
    (i) => {
      const [, a] = y(e, n);
      return a(i);
    }
  ];
}
function $(e, n, t) {
  var i;
  let r = (i = l.get(e)) == null ? void 0 : i[n];
  r instanceof c && (r = r.value);
  const s = r;
  if (s && Array.isArray(s))
    return s[1](t);
  y(e, n, t);
}
function q(e, n) {
  var s;
  let t = (s = l.get(e)) == null ? void 0 : s[n];
  t instanceof c && (t = t.value);
  const r = t;
  if (r && Array.isArray(r))
    return r[0];
}
function y(e, n, t) {
  const r = l.get(e);
  f(r, n);
  const s = S(t);
  return g(e, n, s), s;
}
function z(e, n, t, r) {
  const s = l.get(e);
  f(s, n);
  const i = S({}), a = t.subscribe({
    next: (o) => i[1](o),
    error: (o) => {
      if (r != null && r.onError)
        r.onError(o);
      else
        throw o;
    }
  });
  return g(e, n, i, { onDelete: "unsubscribe" in a ? a.unsubscribe : a }), i[0];
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
  g as setElementVar,
  j as useElementSignal,
  q as useElementStore
};
//# sourceMappingURL=vars.js.map
