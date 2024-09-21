import { createSignal as f, createEffect as l, onCleanup as u } from "solid-js";
const o = /* @__PURE__ */ new Map(), a = new MutationObserver((i) => {
  if (o.size)
    for (const c of i) {
      const { addedNodes: r } = c;
      if (r)
        for (let s = 0; s < r.length; s++) {
          const t = r[s], n = o.get(t);
          if (n && (n(() => t), o.delete(t)), t.hasChildNodes())
            for (const [e, d] of o.entries())
              t.contains(e) && (d(() => e), o.delete(e));
        }
    }
});
a.observe(document, { childList: !0, subtree: !0 });
function b(i) {
  const [c, r] = f(i), [s, t] = f();
  return l((n) => {
    const e = c();
    return e.isConnected ? t(() => e) : n !== e && o.set(e, t), e;
  }), u(() => {
    const n = c();
    n && o.delete(n);
  }), [s, r];
}
export {
  b as createConnectedElementSignal
};
//# sourceMappingURL=createConnectedElementSignal.js.map
