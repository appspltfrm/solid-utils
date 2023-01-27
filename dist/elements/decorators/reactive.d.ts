export interface ReactiveOptions {
    attribute?: string;
}
export declare function reactive(): (proto: any, propName: string, propertyDescriptor?: PropertyDescriptor) => void;
