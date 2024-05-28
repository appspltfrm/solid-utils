import { getOwner as w, onCleanup as i } from "solid-js";
const o = /* @__PURE__ */ new WeakMap();
function c(r, t) {
  if (r && t in r)
    throw new Error(`Var ${String(t)} already exists`);
}
function f(r, t) {
  const e = w();
  if (!e)
    throw new Error("No owner, cannot create context");
  let n = o.get(e);
  return c(n, r), n || (o.set(e, n = {}), i(() => o.delete(e))), n[r] = t, t;
}
function a(r, t) {
  let e = w();
  if (!e)
    throw new Error("No owner, cannot set context");
  for (; e; ) {
    const n = o.get(e);
    if (n && r in n)
      return n[r] = t, t;
    e = e.owner;
  }
  return t;
}
function x(r) {
  let t = w();
  if (!t)
    throw new Error("No owner, cannot create context");
  for (; t; ) {
    const e = o.get(t);
    if (console.log(t, e), e && r in e)
      return e[r];
    t = t.owner;
  }
}
export {
  f as createContext,
  x as getContext,
  a as setContext
};
//# sourceMappingURL=context.js.map
