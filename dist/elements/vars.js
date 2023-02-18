import { createSignal as l } from "solid-js";
import { createStore as f } from "solid-js/store";
const i = /* @__PURE__ */ new WeakMap();
function c(t, n) {
  if (t && n in t)
    throw new Error(`Element var ${String(n)} already exists`);
}
function S(t, n) {
  var e;
  return (e = i.get(t)) == null ? void 0 : e[n];
}
function a(t, n, e) {
  let r = i.get(t);
  return r || (r = {}, i.set(t, r), t.addDisconnectedCallback(() => i.delete(t))), r[n] = e, r[n];
}
function g(t, n) {
  const e = i.get(t);
  e && delete e[n];
}
function b(t, n, e) {
  const r = i.get(t);
  c(r, n);
  const s = l(e);
  return a(t, n, s), s;
}
function y(t, n) {
  var r;
  const e = (r = i.get(t)) == null ? void 0 : r[n];
  if (e && Array.isArray(e))
    return e[0];
  if (e && typeof e == "function")
    return e;
}
function p(t, n, e) {
  var s;
  let r = (s = i.get(t)) == null ? void 0 : s[n];
  r ? Array.isArray(r) && r[1](e) : b(t, n, e);
}
function v(t, n) {
  g(t, n);
}
function k(t, n, e) {
  const r = i.get(t);
  c(r, n);
  const s = l(), o = e.subscribe((u) => s[1](() => u));
  return t.addDisconnectedCallback(() => "unsubscribe" in o ? o.unsubscribe() : o()), a(t, n, s), s[0];
}
function A(t, n) {
  g(t, n);
}
function V(t, n, e) {
  const r = i.get(t);
  c(r, n);
  const s = f(e);
  return a(t, n, s), s;
}
function w(t, n, e) {
  const r = i.get(t);
  c(r, n);
  const s = f({}), o = e.subscribe((u) => s[1](u));
  return a(t, n, s), t.addDisconnectedCallback(() => "unsubscribe" in o ? o.unsubscribe() : o()), s[0];
}
export {
  b as createElementSignal,
  V as createElementStore,
  v as deleteElementSignal,
  A as deleteElementStore,
  g as deleteElementVar,
  y as getElementSignal,
  S as getElementVar,
  k as loadElementSignal,
  w as loadElementStore,
  p as setElementSignal,
  a as setElementVar
};
//# sourceMappingURL=vars.js.map
