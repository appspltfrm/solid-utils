import { Accessor, Signal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { SolidElement } from "./SolidElement";
type VarName = string | symbol;
type Observable<T> = {
    subscribe: (fn: (v: T) => void) => (() => void) | {
        unsubscribe: () => void;
    };
};
export declare function getElementVar<T>(element: SolidElement, name: VarName): T;
export declare function setElementVar(element: SolidElement, name: VarName, value: any, options?: {
    onDelete?: (() => any | void);
}): void;
export declare function deleteElementVar(element: SolidElement, name: VarName): void;
export declare function createElementSignal<T = any>(element: SolidElement, name: VarName, value?: T): Signal<T | undefined>;
export declare function useElementSignal<T = any>(element: SolidElement, name: VarName): Signal<T>;
export declare function getElementSignal<T = any>(element: SolidElement, name: VarName): Accessor<T>;
export declare function setElementSignal<T = any>(element: SolidElement, name: VarName, value: (prev: T) => T): void;
export declare function deleteElementSignal(element: SolidElement, name: VarName): void;
export declare function loadElementSignal<T = any>(element: SolidElement, name: VarName, observable: Observable<T>): Accessor<T | undefined>;
export declare function deleteElementStore(element: SolidElement, name: VarName): void;
export declare function useElementStore<S extends Record<any, any>>(element: SolidElement, name: VarName): ReturnType<typeof createStore<S>>;
export declare function setElementStore<S extends Record<any, any>>(element: SolidElement, name: VarName, newValue: S): void;
export declare function getElementStore<S extends Record<any, any>>(element: SolidElement, name: VarName): Store<S>;
export declare function createElementStore<T extends string, V>(element: SolidElement, name: VarName, value?: Record<T, V>): [get: object, set: import("solid-js/store").SetStoreFunction<object>];
export declare function loadElementStore<T extends string, V>(element: SolidElement, name: VarName, value: Observable<Record<T, V>>): Record<T, V>;
export {};
