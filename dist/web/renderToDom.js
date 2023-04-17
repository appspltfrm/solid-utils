import { createRoot as l, createSignal as m, createEffect as a, createComponent as p } from "solid-js";
import { assign as d, insert as u } from "solid-js/web";
async function y(i, o, r) {
  const n = typeof o == "object" && o.component || o;
  let e;
  return typeof n == "string" ? (e = document.createElement(n), d(e, r, !1, !0), i.appendChild(e)) : e = await new Promise((s) => {
    l((c) => {
      u(i, () => {
        const [t, f] = m();
        return a(() => {
          t() && (t().__solidDispose = () => {
            c(), delete t().__solidDispose;
          }, s(t()));
        }), p(n, { ...r, ref: f });
      });
    });
  }), e;
}
export {
  y as renderToDom
};
//# sourceMappingURL=renderToDom.js.map
