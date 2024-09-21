import { createSignal as i, onMount as u, onCleanup as l } from "solid-js";
const n = /* @__PURE__ */ new Map(), a = new MutationObserver((r) => {
  for (const s of r) {
    const { addedNodes: o } = s;
    if (o)
      for (let t = 0; t < o.length; t++) {
        const e = o[t], f = n.get(e);
        if (f)
          f(() => e), n.delete(e);
        else
          for (const [c, d] of n.entries())
            e.contains(c) && (d(() => c), n.delete(c));
      }
  }
});
a.observe(document, { childList: !0, subtree: !0 });
function m() {
  const [r, s] = i(), [o, t] = i();
  return u(() => {
    const e = r();
    e.isConnected ? t(() => e) : n.set(e, t);
  }), l(() => {
    const e = r();
    e && n.delete(e);
  }), [o, s];
}
export {
  m as createConnectedRef
};
//# sourceMappingURL=createConnectedRef.js.map
