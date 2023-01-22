function n() {
  return (c, e, o) => {
    const r = c.constructor, t = r.__reactive ?? [];
    t.push(e), r.__reactive = t;
  };
}
export {
  n as reactive
};
//# sourceMappingURL=reactive.js.map
