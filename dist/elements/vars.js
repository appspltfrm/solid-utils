var y = Object.defineProperty;
var A = (e, t, n) => t in e ? y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var v = (e, t, n) => (A(e, typeof t != "symbol" ? t + "" : t, n), n);
import { createSignal as b } from "solid-js";
import { createStore as S } from "solid-js/store";
const i = /* @__PURE__ */ new WeakMap();
class c {
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
  return n instanceof c ? n.value : n;
}
function g(e, t, n, r) {
  let l = i.get(e);
  l || (l = {}, i.set(e, l), e.addDisconnectedCallback(() => {
    var a;
    const u = i.get(e);
    if (u)
      for (const o of Object.values(u))
        o instanceof c && ((a = o.onDelete) == null || a.call(o));
    i.delete(e);
  }));
  let s = n;
  r != null && r.onDelete && (s = new c(), s.value = n, s.onDelete = r.onDelete), l[t] = s;
}
function d(e, t) {
  var r;
  const n = i.get(e);
  if (n) {
    let l = n[t];
    return l instanceof c && ((r = l.onDelete) == null || r.call(l), l = l.value), delete n[t], l;
  }
}
function E(e, t, n) {
  const r = i.get(e);
  f(r, t);
  const l = b(n);
  return g(e, t, l), l;
}
function k(e, t) {
  var l;
  let n = (l = i.get(e)) == null ? void 0 : l[t];
  n instanceof c && (n = n.value);
  let r = n;
  return r || (r = E(e, t)), r;
}
function j(e, t) {
  var l;
  let n = (l = i.get(e)) == null ? void 0 : l[t];
  n instanceof c && (n = n.value);
  let r = n;
  return r || (r = E(e, t)), r[0]();
}
function C(e, t, n) {
  var s;
  let r = (s = i.get(e)) == null ? void 0 : s[t];
  r instanceof c && (r = r.value);
  let l = r;
  l || (l = E(e, t)), l[1](n);
}
function M(e, t) {
  d(e, t);
}
function N(e, t, n, r) {
  const l = i.get(e);
  f(l, t);
  const s = b(), u = n.subscribe({
    next: (a) => s[1](() => a),
    error: (a) => {
      if (r != null && r.onError)
        r.onError(a);
      else
        throw a;
    }
  });
  return g(e, t, s, { onDelete: "unsubscribe" in u ? u.unsubscribe : u }), s[0];
}
function O(e, t) {
  d(e, t);
}
function W(e, t) {
  var l;
  let n = (l = i.get(e)) == null ? void 0 : l[t];
  n instanceof c && (n = n.value);
  const r = n;
  return r && Array.isArray(r) ? r : [
    void 0,
    (s) => {
      const [, u] = D(e, t);
      return u(s);
    }
  ];
}
function $(e, t, n) {
  var s;
  let r = (s = i.get(e)) == null ? void 0 : s[t];
  r instanceof c && (r = r.value);
  const l = r;
  if (l && Array.isArray(l))
    return l[1](n);
  D(e, t, n);
}
function q(e, t) {
  var l;
  let n = (l = i.get(e)) == null ? void 0 : l[t];
  n instanceof c && (n = n.value);
  const r = n;
  if (r && Array.isArray(r))
    return r[0];
}
function D(e, t, n) {
  const r = i.get(e);
  f(r, t);
  const l = S(n);
  return g(e, t, l), l;
}
function z(e, t, n, r) {
  const l = i.get(e);
  f(l, t);
  const s = S({}), u = n.subscribe({
    next: (a) => s[1](a),
    error: (a) => {
      if (r != null && r.onError)
        r.onError(a);
      else
        throw a;
    }
  });
  return g(e, t, s, { onDelete: "unsubscribe" in u ? u.unsubscribe : u }), s[0];
}
export {
  E as createElementSignal,
  D as createElementStore,
  M as deleteElementSignal,
  O as deleteElementStore,
  d as deleteElementVar,
  j as getElementSignal,
  q as getElementStore,
  h as getElementVar,
  N as loadElementSignal,
  z as loadElementStore,
  C as setElementSignal,
  $ as setElementStore,
  g as setElementVar,
  k as useElementSignal,
  W as useElementStore
};
//# sourceMappingURL=vars.js.map
