import { getOwner as i, onCleanup as w } from "solid-js";
const o = /* @__PURE__ */ new WeakMap();
function c(n, t) {
  if (n && t in n)
    throw new Error(`Var ${String(t)} already exists`);
}
function f(n, t) {
  const e = i();
  if (!e)
    throw new Error("No owner, cannot create context");
  let r = o.get(e);
  return c(r, n), r || (o.set(e, r = {}), w(() => o.delete(e))), r[n] = t, t;
}
function a(n, t) {
  let e = i();
  if (!e)
    throw new Error("No owner, cannot set context");
  for (; e; ) {
    const r = o.get(e);
    if (r && n in r)
      return r[n] = t, t;
    e = e.owner;
  }
  return t;
}
function x(n) {
  let t = i();
  for (t || console.warn("No owner, cannot create context"); t; ) {
    const e = o.get(t);
    if (e && n in e)
      return e[n];
    t = t.owner;
  }
}
export {
  f as createContext,
  x as getContext,
  a as setContext
};
//# sourceMappingURL=context.js.map
