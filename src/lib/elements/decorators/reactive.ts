import {ElementReactiveProp} from "../ElementReactiveProp";

export function reactive(options?: ElementReactiveProp) {

    return (proto: any, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        const constructor = proto.constructor;
        const reactive: {[propName: string]: boolean | ElementReactiveProp} = constructor.reactive ?? {};
        reactive[propName] = options ?? true;

        constructor.reactive = reactive;
    }
}
