import { getOwner as w, onCleanup as i } from "solid-js";
const o = /* @__PURE__ */ new WeakMap();
function c(e, t) {
  if (e && t in e)
    throw new Error(`Var ${String(t)} already exists`);
}
function f(e, t) {
  const r = w();
  if (!r)
    throw new Error("No owner, cannot create context");
  let n = o.get(r);
  return c(n, e), n || (o.set(r, n = {}), i(() => o.delete(r))), n[e] = t, t;
}
function a(e, t) {
  let r = w();
  if (!r)
    throw new Error("No owner, cannot set context");
  for (; r; ) {
    const n = o.get(r);
    if (n && e in n)
      return n[e] = t, t;
    r = r.owner;
  }
  return t;
}
function x(e) {
  let t = w();
  if (!t)
    throw new Error("No owner, cannot create context");
  for (; t; ) {
    const r = o.get(t);
    if (r && e in r)
      return r[e];
    t = t.owner;
  }
}
export {
  f as createContext,
  x as getContext,
  a as setContext
};
//# sourceMappingURL=context.js.map
