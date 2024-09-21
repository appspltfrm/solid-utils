import { createSignal as f, onMount as u, onCleanup as l } from "solid-js";
const t = /* @__PURE__ */ new Map(), a = new MutationObserver((r) => {
  if (t.size)
    for (const s of r) {
      const { addedNodes: o } = s;
      if (o)
        for (let n = 0; n < o.length; n++) {
          const e = o[n], i = t.get(e);
          if (i && (i(() => e), t.delete(e)), e.hasChildNodes())
            for (const [c, d] of t.entries())
              e.contains(c) && (d(() => c), t.delete(c));
        }
    }
});
a.observe(document, { childList: !0, subtree: !0 });
function h() {
  const [r, s] = f(), [o, n] = f();
  return u(() => {
    const e = r();
    e.isConnected ? n(() => e) : t.set(e, n);
  }), l(() => {
    const e = r();
    e && t.delete(e);
  }), [o, s];
}
export {
  h as createConnectedRef
};
//# sourceMappingURL=createConnectedRef.js.map
