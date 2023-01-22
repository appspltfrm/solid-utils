function s(r) {
  const e = {};
  for (const [o, t] of Object.entries(r))
    e[o.replace(/\.?([A-Z]+)/g, (n, c) => "-" + c.toLowerCase()).replace("_", "-").replace(/^-/, "")] = t;
  return e;
}
export {
  s as camelPropsToDashedAttrs
};
//# sourceMappingURL=camelPropsToDashedAttrs.js.map
