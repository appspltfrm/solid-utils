import { Accessor, Signal } from "solid-js";
import { SolidElement } from "./SolidElement";
type VarName = string | symbol;
type Observable<T> = {
    subscribe: (fn: (v: T) => void) => (() => void) | {
        unsubscribe: () => void;
    };
};
export declare function getElementVar<T>(element: SolidElement, name: VarName): T;
export declare function setElementVar(element: SolidElement, name: VarName, value: any): any;
export declare function deleteElementVar(element: SolidElement, name: VarName): void;
export declare function createElementSignal<T = any>(element: SolidElement, name: VarName, value?: T): Signal<T | undefined>;
export declare function getElementSignal<T = any>(element: SolidElement, name: VarName): Accessor<T> | undefined;
export declare function setElementSignal<T = any>(element: SolidElement, name: VarName, value: (prev: T) => T): void;
export declare function deleteElementSignal(element: SolidElement, name: VarName): void;
export declare function loadElementSignal<T = any>(element: SolidElement, name: VarName, observable: Observable<T>): Accessor<T | undefined>;
export declare function deleteElementStore(element: SolidElement, name: VarName): void;
export declare function createElementStore<T extends string, V>(element: SolidElement, name: VarName, value?: Record<T, V>): [get: object, set: import("solid-js/store").SetStoreFunction<object>];
export declare function loadElementStore<T extends string, V>(element: SolidElement, name: VarName, value: Observable<Record<T, V>>): Record<T, V>;
export {};
