import { Accessor, Signal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { Observer, Unsubscribable } from "type-fest";
import { SolidElement } from "./SolidElement";
type VarName = string | symbol;
export interface ObservableLike<ValueType = unknown> {
    subscribe(observer?: Partial<Observer<ValueType>>): Unsubscribable;
}
export declare function getElementVar<T>(element: SolidElement, name: VarName): T | undefined;
export declare function setElementVar(element: SolidElement, name: VarName, value: any, options?: {
    onDelete?: (() => any | void);
}): void;
export declare function deleteElementVar<T>(element: SolidElement, name: VarName): T | undefined;
export declare function createElementSignal<T = any>(element: SolidElement, name: VarName, value?: T): Signal<T | undefined>;
export declare function useElementSignal<T = any>(element: SolidElement, name: VarName): Signal<T | undefined>;
export declare function getElementSignal<T = any>(element: SolidElement, name: VarName): T | undefined;
export declare function setElementSignal<T = any>(element: SolidElement, name: VarName, value: (prev: T | undefined) => T): void;
export declare function deleteElementSignal(element: SolidElement, name: VarName): void;
export declare function loadElementSignal<T = any>(element: SolidElement, name: VarName, observable: ObservableLike<T>, options?: {
    onError?: (error: any) => void;
}): Accessor<T | undefined>;
export declare function deleteElementStore(element: SolidElement, name: VarName): void;
export declare function useElementStore<S extends {
    [key: string]: any;
}>(element: SolidElement, name: VarName): ReturnType<typeof createStore<S>>;
export declare function setElementStore<S extends {
    [key: string]: any;
}>(element: SolidElement, name: VarName, newValue: S): void;
export declare function getElementStore<S extends {
    [key: string]: any;
}>(element: SolidElement, name: VarName): Store<S>;
export declare function createElementStore<S extends {
    [key: string]: any;
}>(element: SolidElement, name: VarName, value?: S): [get: object, set: import("solid-js/store").SetStoreFunction<object>];
export declare function loadElementStore<S extends {
    [key: string]: any;
}>(element: SolidElement, name: VarName, value: ObservableLike<S>, options?: {
    onError?: (error: any) => void;
}): S;
export {};
