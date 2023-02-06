export interface ReactiveOptions {
    attribute?: string;
}

export function reactive() {

    return (proto: any, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        const constructor = proto.constructor;
        const reactive: {[propName: string]: boolean} = constructor.reactive ?? {};
        reactive[propName] = true;

        constructor.reactive = reactive;
    }
}
