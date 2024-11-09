var o = (n) => {
  throw TypeError(n);
};
var m = (n, t, e) => t.has(n) || o("Cannot " + e);
var r = (n, t, e) => (m(n, t, "read from private field"), e ? e.call(n) : t.get(n)), a = (n, t, e) => t.has(n) ? o("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e);
import { createSignal as c, untrack as u } from "solid-js";
import { createContext as d, getContext as p } from "./context.js";
const h = Symbol("@appspltfrm/solid-utils/LoadingContext"), i = Symbol("main");
var s;
class l {
  constructor() {
    a(this, s, c(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(i);
  }
  start(t) {
    const e = u(() => r(this, s)[0]());
    return r(this, s)[1](new Set(e.add(t ?? i))), this;
  }
  mainStop() {
    return this.stop(i);
  }
  stop(t) {
    const e = u(() => r(this, s)[0]());
    return e.delete(t ?? i) && r(this, s)[1](new Set(e)), this;
  }
  size() {
    return r(this, s)[0]().size;
  }
  busy() {
    return r(this, s)[0]().size > 0;
  }
  mainBusy() {
    return r(this, s)[0]().has(i);
  }
  jobs() {
    return [...r(this, s)[0]()];
  }
}
s = new WeakMap();
function g() {
  return d(h, new l());
}
function f() {
  return p(h);
}
export {
  g as createLoadingContext,
  f as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
