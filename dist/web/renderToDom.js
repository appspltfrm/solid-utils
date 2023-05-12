import { createRoot as d, createSignal as m, createEffect as p, createComponent as l } from "solid-js";
import { assign as u, insert as y } from "solid-js/web";
const s = Symbol("renderToDom:dispose");
async function b(e, t, c) {
  const r = typeof t == "object" && t.component || t;
  let o;
  return typeof r == "string" ? (o = document.createElement(r), u(o, c, !1, !0), e.appendChild(o)) : o = await new Promise((i) => {
    d((f) => {
      y(e, () => {
        const [n, a] = m();
        return p(() => {
          n() && (n()[s] = () => {
            f(), delete n()[s];
          }, i(n()));
        }), l(r, { ...c, ref: a });
      });
    });
  }), o;
}
async function D(e) {
  var t;
  (t = e[s]) == null || t.call(e);
}
export {
  D as disposeRenderedElement,
  b as renderToDom
};
//# sourceMappingURL=renderToDom.js.map
