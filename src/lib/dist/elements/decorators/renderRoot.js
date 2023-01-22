function a(d, e) {
  return function(_) {
    _.__noShadow = d === "element", d === "shadow" && (_.__shadowStyles = e == null ? void 0 : e.styles);
  };
}
export {
  a as renderRoot
};
//# sourceMappingURL=renderRoot.js.map
