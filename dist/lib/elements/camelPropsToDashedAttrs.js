export function camelPropsToDashedAttrs(props) {
    const niu = {};
    for (const [k, v] of Object.entries(props)) {
        // niu[k.toLowerCase().replace(/(-)([a-z])/g, test => test.toUpperCase().replace("-", ""))] = v;
        niu[k.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "")] = v;
    }
    return niu;
}
//# sourceMappingURL=camelPropsToDashedAttrs.js.map