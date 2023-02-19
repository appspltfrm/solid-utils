var y = Object.defineProperty;
var A = (e, t, n) => t in e ? y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var v = (e, t, n) => (A(e, typeof t != "symbol" ? t + "" : t, n), n);
import { createSignal as b } from "solid-js";
import { createStore as S } from "solid-js/store";
const i = /* @__PURE__ */ new WeakMap();
class o {
  constructor() {
    v(this, "value");
    v(this, "onDelete");
  }
}
function f(e, t) {
  if (e && t in e)
    throw new Error(`Element var ${String(t)} already exists`);
}
function h(e, t) {
  var r;
  const n = (r = i.get(e)) == null ? void 0 : r[t];
  return n instanceof o ? n.value : n;
}
function g(e, t, n, r) {
  let s = i.get(e);
  s || (s = {}, i.set(e, s), e.addDisconnectedCallback(() => {
    var c;
    const u = i.get(e);
    if (u)
      for (const a of Object.values(u))
        a instanceof o && ((c = a.onDelete) == null || c.call(a));
    i.delete(e);
  }));
  let l = n;
  r != null && r.onDelete && (l = new o(), l.value = n, l.onDelete = r.onDelete), s[t] = l;
}
function d(e, t) {
  var r;
  const n = i.get(e);
  if (n) {
    const s = n[t];
    s instanceof o && ((r = s.onDelete) == null || r.call(s)), delete n[t];
  }
}
function E(e, t, n) {
  const r = i.get(e);
  f(r, t);
  const s = b(n);
  return g(e, t, s), s;
}
function k(e, t) {
  var s;
  let n = (s = i.get(e)) == null ? void 0 : s[t];
  n instanceof o && (n = n.value);
  let r = n;
  return r || (r = E(e, t)), r;
}
function j(e, t) {
  var s;
  let n = (s = i.get(e)) == null ? void 0 : s[t];
  n instanceof o && (n = n.value);
  let r = n;
  return r || (r = E(e, t)), r[0]();
}
function C(e, t, n) {
  var l;
  let r = (l = i.get(e)) == null ? void 0 : l[t];
  r instanceof o && (r = r.value);
  let s = r;
  s || (s = E(e, t)), s[1](n);
}
function M(e, t) {
  d(e, t);
}
function N(e, t, n, r) {
  const s = i.get(e);
  f(s, t);
  const l = b(), u = n.subscribe({
    next: (c) => l[1](() => c),
    error: (c) => {
      if (r != null && r.onError)
        r.onError(c);
      else
        throw c;
    }
  });
  return g(e, t, l, { onDelete: "unsubscribe" in u ? u.unsubscribe : u }), l[0];
}
function O(e, t) {
  d(e, t);
}
function W(e, t) {
  var s;
  let n = (s = i.get(e)) == null ? void 0 : s[t];
  n instanceof o && (n = n.value);
  const r = n;
  return r && Array.isArray(r) ? r : [
    void 0,
    (l) => {
      const [, u] = D(e, t);
      return u(l);
    }
  ];
}
function $(e, t, n) {
  var l;
  let r = (l = i.get(e)) == null ? void 0 : l[t];
  r instanceof o && (r = r.value);
  const s = r;
  if (s && Array.isArray(s))
    return s[1](n);
  D(e, t, n);
}
function q(e, t) {
  var s;
  let n = (s = i.get(e)) == null ? void 0 : s[t];
  n instanceof o && (n = n.value);
  const r = n;
  if (r && Array.isArray(r))
    return r[0];
}
function D(e, t, n) {
  const r = i.get(e);
  f(r, t);
  const s = S(n);
  return g(e, t, s), s;
}
function z(e, t, n, r) {
  const s = i.get(e);
  f(s, t);
  const l = S({}), u = n.subscribe({
    next: (c) => l[1](c),
    error: (c) => {
      if (r != null && r.onError)
        r.onError(c);
      else
        throw c;
    }
  });
  return g(e, t, l, { onDelete: "unsubscribe" in u ? u.unsubscribe : u }), l[0];
}
export {
  E as createElementSignal,
  D as createElementStore,
  M as deleteElementSignal,
  O as deleteElementStore,
  d as deleteElementVar,
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
