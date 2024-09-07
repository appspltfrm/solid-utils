import { createMemo as l, getOwner as m, onCleanup as S } from "solid-js";
import { createStore as s } from "solid-js/store";
function w(c, r) {
  if (typeof c == "function") {
    const u = l((e) => {
      const t = e == null ? void 0 : e[0], b = c(t);
      return t === b ? e : (e && e[3].unsubscribe(), [b, ...w(b, r)]);
    });
    return [() => u()[1], (e) => u()[2](e), () => u()[3].unsubscribe()];
  }
  const [n, a] = s((r == null ? void 0 : r.value) || {}), f = c.subscribe({
    next: (u) => a(() => u),
    error: (u) => {
      var e;
      return (e = r == null ? void 0 : r.onError) == null ? void 0 : e.call(r, u);
    }
  });
  return m() && (r == null ? void 0 : r.autoUnsubscribe) !== !1 && S(() => f.unsubscribe()), [n, a, f];
}
export {
  w as createStoreFromObservable
};
//# sourceMappingURL=createStoreFromObservable.js.map
