export interface ReactiveOptions {
    attribute?: string;
}

export function reactive() {

    return (proto: any, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        const constructor = proto.constructor;
        const reactive: string[] = constructor.__reactive ?? [];
        reactive.push(propName);

        constructor.__reactive = reactive;
    }
}
