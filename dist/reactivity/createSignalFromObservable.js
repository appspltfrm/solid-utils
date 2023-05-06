import { createMemo as t, createSignal as g, getOwner as m, onCleanup as w } from "solid-js";
function x(c, e) {
  if (typeof c == "function") {
    const u = t((r) => {
      const l = r == null ? void 0 : r[0], a = c(l);
      return l === a ? r : (r && r[3].unsubscribe(), [a, ...x(a, e)]);
    });
    return [() => u()[1](), (r) => u()[2](r), () => u()[3].unsubscribe()];
  }
  const [n, b] = g(e == null ? void 0 : e.value), f = c.subscribe({
    next: (u) => b(() => u),
    error: (u) => {
      var r;
      return (r = e == null ? void 0 : e.onError) == null ? void 0 : r.call(e, u);
    }
  });
  return m() && (e == null ? void 0 : e.autoUnsubscribe) !== !1 && w(() => f.unsubscribe()), [n, b, f];
}
export {
  x as createSignalFromObservable
};
//# sourceMappingURL=createSignalFromObservable.js.map
