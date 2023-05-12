export declare function createContext<T>(name: string | symbol, initialValue: T): T;
export declare function setContext<T>(name: string | symbol, value: T): T;
export declare function getContext<T>(name: string | symbol): T | undefined;
