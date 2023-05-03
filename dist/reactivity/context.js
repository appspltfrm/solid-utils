import { getOwner as w, onCleanup as i } from "solid-js";
const o = /* @__PURE__ */ new WeakMap();
function s(e, t) {
  if (e && t in e)
    throw new Error(`Var ${String(t)} already exists`);
}
function f(e, t) {
  const r = w();
  if (!r)
    throw new Error("No owner, cannot create context");
  let n = o.get(r);
  return s(n, e), n || (o.set(r, n = {}), i(() => o.delete(r))), n[e] = t, t;
}
function a(e) {
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
  a as getContext,
  f as setContext
};
//# sourceMappingURL=context.js.map
