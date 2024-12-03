import { createSignal as t, createEffect as S, getOwner as x, onCleanup as E } from "solid-js";
function m(c, e) {
  const [g, a] = t(e == null ? void 0 : e.value), [f, s] = t(void 0), l = (r) => s((u) => (u == null || u.unsubscribe(), r.subscribe({
    next: (b) => a(() => b),
    error: (b) => {
      var n;
      return (n = e == null ? void 0 : e.onError) == null ? void 0 : n.call(e, b);
    }
  })));
  return typeof c == "function" ? S((r) => {
    const u = c(r);
    return u === r ? r : (l(u), u);
  }) : l(c), x() && (e == null ? void 0 : e.autoUnsubscribe) !== !1 && E(() => {
    var r;
    return (r = f()) == null ? void 0 : r.unsubscribe();
  }), [g, a, f];
}
export {
  m as createSignalFromObservable
};
//# sourceMappingURL=createSignalFromObservable.js.map
