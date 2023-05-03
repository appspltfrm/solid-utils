import { getOwner as w, onCleanup as c } from "solid-js";
const o = /* @__PURE__ */ new WeakMap();
function i(r, t) {
  if (r && t in r)
    throw new Error(`Var ${String(t)} already exists`);
}
function s(r, t) {
  const e = w();
  if (!e)
    throw new Error("No owner, cannot create context");
  let n = o.get(e);
  return i(n, r), n || (o.set(e, n = {}), c(() => o.delete(e))), n[r] = t, t;
}
function f(r) {
  let t = w();
  if (!t)
    throw new Error("No owner, cannot create context");
  for (; t; ) {
    const e = o.get(t);
    if (e && r in e)
      return e[r];
    t = t.owner;
  }
}
export {
  s as createContextVar,
  f as getContextVar
};
//# sourceMappingURL=context-vars.js.map
