var A = Object.defineProperty;
var D = (e, n, t) => n in e ? A(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var g = (e, n, t) => (D(e, typeof n != "symbol" ? n + "" : n, t), t);
import { createSignal as E } from "solid-js";
import { createStore as S } from "solid-js/store";
const o = /* @__PURE__ */ new WeakMap();
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
function k(e, n) {
  var r;
  const t = (r = o.get(e)) == null ? void 0 : r[n];
  return t instanceof a ? t.value : t;
}
function f(e, n, t, r) {
  let s = o.get(e);
  s || (s = {}, o.set(e, s), e.addDisconnectedCallback(() => {
    var v;
    const l = o.get(e);
    if (l)
      for (const c of Object.values(l))
        c instanceof a && ((v = c.onDelete) == null || v.call(c));
    o.delete(e);
  }));
  let i = t;
  r != null && r.onDelete && (i = new a(), i.value = t, i.onDelete = r.onDelete), s[n] = i;
}
function b(e, n) {
  var r;
  const t = o.get(e);
  if (t) {
    const s = t[n];
    s instanceof a && ((r = s.onDelete) == null || r.call(s)), delete t[n];
  }
}
function d(e, n, t) {
  const r = o.get(e);
  u(r, n);
  const s = E(t);
  return f(e, n, s), s;
}
function h(e, n) {
  var s;
  let t = (s = o.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [() => {
  }, (i) => {
    const [, l] = d(e, n);
    return l(i);
  }];
}
function j(e, n) {
  var s;
  let t = (s = o.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r[0] : () => {
  };
}
function C(e, n, t) {
  var i;
  let r = (i = o.get(e)) == null ? void 0 : i[n];
  r instanceof a && (r = r.value);
  let s = r;
  s ? Array.isArray(s) && s[1](t) : d(e, n, t);
}
function M(e, n) {
  b(e, n);
}
function N(e, n, t) {
  const r = o.get(e);
  u(r, n);
  const s = E(), i = t.subscribe((l) => s[1](() => l));
  return f(e, n, s, { onDelete: "unsubscribe" in i ? i.unsubscribe : i }), s[0];
}
function O(e, n) {
  b(e, n);
}
function W(e, n) {
  var s;
  let t = (s = o.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  return r && Array.isArray(r) ? r : [
    void 0,
    (i) => {
      const [, l] = y(e, n);
      return l(i);
    }
  ];
}
function $(e, n, t) {
  var i;
  let r = (i = o.get(e)) == null ? void 0 : i[n];
  r instanceof a && (r = r.value);
  const s = r;
  if (s && Array.isArray(s))
    return s[1](t);
  y(e, n, t);
}
function q(e, n) {
  var s;
  let t = (s = o.get(e)) == null ? void 0 : s[n];
  t instanceof a && (t = t.value);
  const r = t;
  if (r && Array.isArray(r))
    return r[0];
}
function y(e, n, t) {
  const r = o.get(e);
  u(r, n);
  const s = S(t);
  return f(e, n, s), s;
}
function z(e, n, t) {
  const r = o.get(e);
  u(r, n);
  const s = S({}), i = t.subscribe((l) => s[1](l));
  return f(e, n, s, { onDelete: "unsubscribe" in i ? i.unsubscribe : i }), s[0];
}
export {
  d as createElementSignal,
  y as createElementStore,
  M as deleteElementSignal,
  O as deleteElementStore,
  b as deleteElementVar,
  h as getElementSignal,
  W as getElementStore,
  k as getElementVar,
  N as loadElementSignal,
  z as loadElementStore,
  C as setElementSignal,
  $ as setElementStore,
  f as setElementVar,
  j as useElementSignal,
  q as useElementStore
};
//# sourceMappingURL=vars.js.map
