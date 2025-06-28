var u = (e) => {
  throw TypeError(e);
};
var h = (e, t, n) => t.has(e) || u("Cannot " + n);
var s = (e, t, n) => (h(e, t, "read from private field"), n ? n.call(e) : t.get(e)), l = (e, t, n) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n);
import { createSignal as m, createResource as p, createUniqueId as y, createEffect as g, onCleanup as x, untrack as d } from "solid-js";
import { createContext as S, getContext as C } from "./context.js";
const f = Symbol("@appspltfrm/solid-utils/LoadingContext"), c = Symbol("main");
var o;
class b {
  constructor() {
    l(this, o, m(/* @__PURE__ */ new Set()));
  }
  mainStart() {
    return this.start(c);
  }
  start(t) {
    let n, r;
    if (t instanceof Promise) {
      const [i] = p(() => t);
      r = i;
    } else t[a.jobFactory] ? r = t[a.jobFactory]() : t && typeof t == "function" ? r = t : n = t;
    if (r) {
      const i = Symbol(`Resource ${y()}`);
      this.start(i), g(() => !r.loading && this.stop(i)), x(() => this.stop(i));
    } else if (n) {
      const i = d(() => s(this, o)[0]());
      s(this, o)[1](new Set(i.add(n)));
    }
    return this;
  }
  mainStop() {
    return this.stop(c);
  }
  stop(t) {
    const n = d(() => s(this, o)[0]());
    return n.delete(t) && s(this, o)[1](new Set(n)), this;
  }
  size() {
    return s(this, o)[0]().size;
  }
  busy() {
    return s(this, o)[0]().size > 0;
  }
  mainBusy() {
    return s(this, o)[0]().has(c);
  }
  jobs() {
    return [...s(this, o)[0]()];
  }
}
o = new WeakMap();
var a;
((e) => {
  e.jobFactory = Symbol("LoadingContextJobFactory");
})(a || (a = {}));
function F() {
  return S(f, new b());
}
function z() {
  return C(f);
}
export {
  a as LoadingContext,
  F as createLoadingContext,
  z as getLoadingContext
};
//# sourceMappingURL=LoadingContext.js.map
