var u = (e) => {
  throw TypeError(e);
};
var m = (e, t, o) => t.has(e) || u("Cannot " + o);
var s = (e, t, o) => (m(e, t, "read from private field"), o ? o.call(e) : t.get(e)), l = (e, t, o) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o);
import { createSignal as f, createResource as p, createUniqueId as y, createEffect as g, onCleanup as x, untrack as d } from "solid-js";
import { createContext as S, getContext as C } from "./context.js";
const h = Symbol("@appspltfrm/solid-utils/LoadingContext"), c = Symbol("main");
var n;
class b {
  constructor() {
    l(this, n, f(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(c);
  }
  start(t) {
    let o, i;
    if (t instanceof Promise) {
      const [r] = p(() => t);
      i = r;
    } else t[a.jobFactory] ? i = t[a.jobFactory]() : t && typeof t == "object" ? i = t : o = t;
    if (i) {
      const r = Symbol(`Resource ${y()}`);
      this.start(r), g(() => !i.loading && this.stop(r)), x(() => this.stop(r));
    } else if (o) {
      const r = d(() => s(this, n)[0]());
      s(this, n)[1](new Set(r.add(o)));
    }
    return this;
  }
  mainStop() {
    return this.stop(c);
  }
  stop(t) {
    const o = d(() => s(this, n)[0]());
    return o.delete(t) && s(this, n)[1](new Set(o)), this;
  }
  size() {
    return s(this, n)[0]().size;
  }
  busy() {
    return s(this, n)[0]().size > 0;
  }
  mainBusy() {
    return s(this, n)[0]().has(c);
  }
  jobs() {
    return [...s(this, n)[0]()];
  }
}
n = new WeakMap();
var a;
((e) => {
  e.jobFactory = Symbol("LoadingContextJobFactory");
})(a || (a = {}));
function F() {
  return S(h, new b());
}
function z() {
  return C(h);
}
export {
  a as LoadingContext,
  F as createLoadingContext,
  z as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
