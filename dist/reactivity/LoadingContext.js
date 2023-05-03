var a = Object.defineProperty;
var u = (s, t, n) => t in s ? a(s, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[t] = n;
var o = (s, t, n) => (u(s, typeof t != "symbol" ? t + "" : t, n), n);
import { createSignal as b, untrack as r } from "solid-js";
import { setContext as m, getContext as c } from "./context.js";
const i = Symbol("@appspltfrm/solid-utils/LoadingContext"), e = Symbol("main");
class g {
  constructor() {
    o(this, "jobs", b(/* @__PURE__ */ new Set()));
  }
  start() {
    const t = arguments.length === 1 ? arguments[0] : e, n = r(() => this.jobs[0]());
    return this.jobs[1](new Set(n.add(t ?? e))), this;
  }
  stop() {
    const t = arguments.length === 1 ? arguments[0] : e, n = r(() => this.jobs[0]());
    return n.delete(t ?? e) && this.jobs[1](new Set(n)), this;
  }
  size() {
    return this.jobs[0]().size;
  }
  busy() {
    return this.jobs[0]().size > 0;
  }
  main() {
    return this.jobs[0]().has(e);
  }
}
function l() {
  return m(i, new g());
}
function p() {
  return c(i);
}
export {
  l as createLoadingContext,
  p as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
