import {Accessor, createSignal, Signal} from "solid-js";
import {createStore, Store} from "solid-js/store";
import {ObservableLike} from "type-fest";
import {SolidElement} from "./SolidElement";

type Vars = {[key: string | symbol]: any};
type VarName = string | symbol;

const allVars = new WeakMap<SolidElement, Vars>()

class VarValue {
    value: any;
    onDelete?: () => void;
}

function assertNotExists(vars: Vars | undefined, name: VarName) {
    if (vars && name in vars) {
        throw new Error(`Element var ${String(name)} already exists`);
    }
}

export function getElementVar<T>(element: SolidElement, name: VarName): T {
    const v = allVars.get(element)?.[name];
    if (v instanceof VarValue) {
        return v.value;
    } else {
        return v;
    }
}

export function setElementVar(element: SolidElement, name: VarName, value: any, options?: {onDelete?: (() => any | void)}) {

    let vars = allVars.get(element);
    if (!vars) {
        vars = {};
        allVars.set(element, vars);

        element.addDisconnectedCallback(() => {

            const vars = allVars.get(element);
            if (vars) {
                for (const v of Object.values(vars)) {
                    if (v instanceof VarValue) {
                        v.onDelete?.();
                    }
                }
            }

            allVars.delete(element)
        });
    }

    let varValue = value;
    if (options?.onDelete) {
        varValue = new VarValue();
        varValue.value = value;
        varValue.onDelete = options.onDelete;
    }

    vars[name] = varValue;
}

export function deleteElementVar(element: SolidElement, name: VarName) {
    const vars = allVars.get(element);
    if (vars) {

        const v = vars[name];
        if (v instanceof VarValue) {
            v.onDelete?.();
        }

        delete vars[name];
    }
}

export function createElementSignal<T = any>(element: SolidElement, name: VarName, value?: T) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const signal = createSignal(value);

    setElementVar(element, name, signal);

    return signal;
}

export function getElementSignal<T = any>(element: SolidElement, name: VarName): Signal<T> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const signal = value as Signal<T>;
    if (signal && Array.isArray(signal)) {
        return signal;
    } else {
        return [() => undefined as T, (v) => {
            const [, setSignal] = createElementSignal(element, name);
            return setSignal(v);
        }] as Signal<T>;
    }
}

export function useElementSignal<T = any>(element: SolidElement, name: VarName): Accessor<T> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const signal = value as Signal<T>;
    if (signal && Array.isArray(signal)) {
        return signal[0];
    } else {
        return () => undefined as unknown as T;
    }
}

export function setElementSignal<T = any>(element: SolidElement, name: VarName, value: (prev: T) => T) {

    let current = allVars.get(element)?.[name];
    if (current instanceof VarValue) {
        current = current.value;
    }

    let signal = current as Signal<T>;

    if (!signal) {
        createElementSignal(element, name, value);
    } else if (Array.isArray(signal)) {
        signal[1](value);
    }
}

export function deleteElementSignal(element: SolidElement, name: VarName) {
    deleteElementVar(element, name);
}

export function loadElementSignal<T = any>(element: SolidElement, name: VarName, observable: ObservableLike<T>) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const signal = createSignal<T>();

    const unsub = observable.subscribe({
        next: (data) => signal[1](() => data),
        error: (error) => {
            throw error
        }
    })

    setElementVar(element, name, signal, {onDelete: ("unsubscribe" in unsub ? unsub.unsubscribe : unsub)});

    return signal[0];
}

export function deleteElementStore(element: SolidElement, name: VarName) {
    deleteElementVar(element, name);
}

export function getElementStore<S extends {[key: string]: any}>(element: SolidElement, name: VarName): ReturnType<typeof createStore<S>> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store;
    } else {
        return [
            undefined as unknown as S,
            (v: any) => {
                const [, setStore] = createElementStore(element, name);
                return setStore(v);
            }
        ] as ReturnType<typeof createStore<S>>;
    }
}

export function setElementStore<S extends {[key: string]: any}>(element: SolidElement, name: VarName, newValue: S){

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store[1](newValue);
    } else {
        createElementStore(element, name, newValue);
    }
}

export function useElementStore<S extends {[key: string]: any}>(element: SolidElement, name: VarName): Store<S> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store[0];
    } else {
        return undefined as unknown as Store<S>;
    }
}

export function createElementStore<S extends {[key: string]: any}>(element: SolidElement, name: VarName, value?: S) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore(value);

    setElementVar(element, name, store);

    return store;
}

export function loadElementStore<S extends {[key: string]: any}>(element: SolidElement, name: VarName, value: ObservableLike<S>) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore<S>({} as any);

    const unsub = value.subscribe({
        next: (data) => store[1](data),
        error: (error) => {
            throw error;
        }
    })

    setElementVar(element, name, store, {onDelete: ("unsubscribe" in unsub ? unsub.unsubscribe : unsub)});

    return store[0];
}
