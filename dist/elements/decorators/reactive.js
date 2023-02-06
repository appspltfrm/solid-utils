function n() {
  return (e, c, o) => {
    const r = e.constructor, t = r.reactive ?? {};
    t[c] = !0, r.reactive = t;
  };
}
export {
  n as reactive
};
//# sourceMappingURL=reactive.js.map
