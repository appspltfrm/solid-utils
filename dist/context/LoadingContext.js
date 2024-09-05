var h = (s, t, n) => {
  if (!t.has(s))
    throw TypeError("Cannot " + n);
};
var r = (s, t, n) => (h(s, t, "read from private field"), n ? n.call(s) : t.get(s)), o = (s, t, n) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, n);
};
import { createSignal as m, untrack as a } from "solid-js";
import { createContext as c, getContext as d } from "./context.js";
const u = Symbol("@appspltfrm/solid-utils/LoadingContext"), i = Symbol("main");
var e;
class p {
  constructor() {
    o(this, e, m(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(i);
  }
  start(t) {
    const n = a(() => r(this, e)[0]());
    return r(this, e)[1](new Set(n.add(t ?? i))), this;
  }
  mainStop() {
    return this.stop(i);
  }
  stop(t) {
    const n = a(() => r(this, e)[0]());
    return n.delete(t ?? i) && r(this, e)[1](new Set(n)), this;
  }
  size() {
    return r(this, e)[0]().size;
  }
  busy() {
    return r(this, e)[0]().size > 0;
  }
  mainBusy() {
    return r(this, e)[0]().has(i);
  }
  jobs() {
    return [...r(this, e)[0]()];
  }
}
e = new WeakMap();
function b() {
  return c(u, new p());
}
function g() {
  return d(u);
}
export {
  b as createLoadingContext,
  g as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
