import {CustomElementReactiveProp} from "../CustomElementReactiveProp";

export function reactive(options?: CustomElementReactiveProp) {

    return (proto: any, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        const constructor = proto.constructor;
        const reactive: {[propName: string]: boolean | CustomElementReactiveProp} = constructor.reactive ?? {};
        reactive[propName] = options ?? true;

        constructor.reactive = reactive;
    }
}
