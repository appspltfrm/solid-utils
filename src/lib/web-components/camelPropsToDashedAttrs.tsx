export function camelPropsToDashedAttrs<T extends { [key: string]: any }>(props: T): T {
    const niu: any = {};

    for (const [k, v] of Object.entries(props)) {
        // niu[k.toLowerCase().replace(/(-)([a-z])/g, test => test.toUpperCase().replace("-", ""))] = v;
        niu[k.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "")] = v;
    }

    return niu;
}
