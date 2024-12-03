import { createSignal as s, createEffect as m, getOwner as g, onCleanup as x } from "solid-js";
import { createStore as E } from "solid-js/store";
function y(u, r) {
  const [S, b] = E((r == null ? void 0 : r.value) || {}), [f, l] = s(void 0), a = (e) => l((c) => (c == null || c.unsubscribe(), e.subscribe({
    next: (t) => b(() => t),
    error: (t) => {
      var n;
      return (n = r == null ? void 0 : r.onError) == null ? void 0 : n.call(r, t);
    }
  })));
  return typeof u == "function" ? m((e) => {
    const c = u(e);
    return c === e ? e : (a(c), c);
  }) : a(u), g() && (r == null ? void 0 : r.autoUnsubscribe) !== !1 && x(() => {
    var e;
    return (e = f()) == null ? void 0 : e.unsubscribe();
  }), [S, b, f];
}
export {
  y as createStoreFromObservable
};
//# sourceMappingURL=createStoreFromObservable.js.map
