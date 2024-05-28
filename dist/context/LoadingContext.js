var a = Object.defineProperty;
var u = (n, t, s) => t in n ? a(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s;
var o = (n, t, s) => (u(n, typeof t != "symbol" ? t + "" : t, s), s);
import { createSignal as b, untrack as i } from "solid-js";
import { createContext as m, getContext as c } from "./context.js";
const r = Symbol("@appspltfrm/solid-utils/LoadingContext"), e = Symbol("main");
class h {
  constructor() {
    o(this, "jobs", b(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(e);
  }
  start(t) {
    const s = i(() => this.jobs[0]());
    return this.jobs[1](new Set(s.add(t ?? e))), this;
  }
  mainStop() {
    return this.stop(e);
  }
  stop(t) {
    const s = i(() => this.jobs[0]());
    return s.delete(t ?? e) && this.jobs[1](new Set(s)), this;
  }
  size() {
    return this.jobs[0]().size;
  }
  busy() {
    return this.jobs[0]().size > 0;
  }
  mainBusy() {
    return this.jobs[0]().has(e);
  }
}
function l() {
  return m(r, new h());
}
function x() {
  return c(r);
}
export {
  l as createLoadingContext,
  x as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
