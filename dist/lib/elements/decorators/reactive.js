export function reactive() {
    return (proto, propName, propertyDescriptor) => {
        const constructor = proto.constructor;
        const reactive = constructor.__reactive ?? [];
        reactive.push(propName);
        constructor.__reactive = reactive;
    };
}
//# sourceMappingURL=reactive.js.map