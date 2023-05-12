var a = Object.defineProperty;
var u = (n, t, s) => t in n ? a(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s;
var e = (n, t, s) => (u(n, typeof t != "symbol" ? t + "" : t, s), s);
import { createSignal as b, untrack as i } from "solid-js";
import { setContext as m, getContext as h } from "./context.js";
const r = Symbol("@appspltfrm/solid-utils/LoadingContext"), o = Symbol("main");
class c {
  constructor() {
    e(this, "jobs", b(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(o);
  }
  start(t) {
    const s = i(() => this.jobs[0]());
    return this.jobs[1](new Set(s.add(t ?? o))), this;
  }
  mainStop() {
    return this.stop(o);
  }
  stop(t) {
    const s = i(() => this.jobs[0]());
    return s.delete(t ?? o) && this.jobs[1](new Set(s)), this;
  }
  size() {
    return this.jobs[0]().size;
  }
  busy() {
    return this.jobs[0]().size > 0;
  }
  mainBusy() {
    return this.jobs[0]().has(o);
  }
}
function l() {
  return m(r, new c());
}
function x() {
  return h(r);
}
export {
  l as createLoadingContext,
  x as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
