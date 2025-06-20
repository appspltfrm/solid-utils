import { createSignal as f, createEffect as a, onCleanup as u } from "solid-js";
const o = /* @__PURE__ */ new Map(), d = "MutationObserver" in globalThis ? new MutationObserver((c) => {
  if (o.size)
    for (const i of c) {
      const { addedNodes: r } = i;
      if (r)
        for (let s = 0; s < r.length; s++) {
          const t = r[s], n = o.get(t);
          if (n && (n(() => t), o.delete(t)), t.hasChildNodes())
            for (const [e, l] of o.entries())
              t.contains(e) && (l(() => e), o.delete(e));
        }
    }
}) : void 0;
d && d.observe(document, { childList: !0, subtree: !0 });
function g(c) {
  const [i, r] = f(c), [s, t] = f();
  return a((n) => {
    const e = i();
    return e.isConnected ? t(() => e) : n !== e && o.set(e, t), e;
  }), u(() => {
    const n = i();
    n && o.delete(n);
  }), [s, r];
}
export {
  g as createConnectedElementSignal
};
//# sourceMappingURL=createConnectedElementSignal.js.map
