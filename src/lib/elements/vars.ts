import {Accessor, createSignal, Signal} from "solid-js";
import {createStore} from "solid-js/store";
import {SolidElement} from "./SolidElement";

type Vars = {[key: string | symbol]: any};
type VarName = string | symbol;
type Observable<T> = {
    subscribe: (fn: (v: T) => void) => (() => void) | {
        unsubscribe: () => void;
    }
}

const allVars = new WeakMap<SolidElement, Vars>()

function assertNotExists(vars: Vars | undefined, name: VarName) {
    if (vars && name in vars) {
        throw new Error(`Element var ${String(name)} already exists`);
    }
}

export function getElementVar<T>(element: SolidElement, name: VarName): T {
    return allVars.get(element)?.[name];
}

export function setElementVar(element: SolidElement, name: VarName, value: any) {

    let vars = allVars.get(element);
    if (!vars) {
        vars = {};
        allVars.set(element, vars);
        element.addDisconnectedCallback(() => allVars.delete(element));
    }

    vars[name] = value;

    return vars[name];
}

export function deleteElementVar(element: SolidElement, name: VarName) {
    const vars = allVars.get(element);
    if (vars) {
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

export function getElementSignal<T = any>(element: SolidElement, name: VarName): Accessor<T> | undefined {
    const signal = allVars.get(element)?.[name] as Signal<T>;
    if (signal && Array.isArray(signal)) {
        return signal[0];
    } else if (signal && typeof signal === "function") {
        return signal;
    }
}

export function setElementSignal<T = any>(element: SolidElement, name: VarName, value: (prev: T) => T) {
    let signal = allVars.get(element)?.[name] as Signal<T>;

    if (!signal) {
        createElementSignal(element, name, value);
    } else if (Array.isArray(signal)) {
        signal[1](value);
    }
}

export function deleteElementSignal(element: SolidElement, name: VarName) {
    deleteElementVar(element, name);
}

export function loadElementSignal<T = any>(element: SolidElement, name: VarName, observable: Observable<T>) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const signal = createSignal<T>();

    const unsub = observable.subscribe(data => signal[1](() => data));
    element.addDisconnectedCallback(() => ("unsubscribe" in unsub ? unsub.unsubscribe() : unsub()));

    setElementVar(element, name, signal);

    return signal[0];
}

export function deleteElementStore(element: SolidElement, name: VarName) {
    deleteElementVar(element, name);
}

export function createElementStore<T extends string, V>(element: SolidElement, name: VarName, value?: Record<T, V>) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore(value);

    setElementVar(element, name, store);

    return store;
}

export function loadElementStore<T extends string, V>(element: SolidElement, name: VarName, value: Observable<Record<T, V>>) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore<Record<T, V>>({} as any);

    const unsub = value.subscribe(data => store[1](data));

    setElementVar(element, name, store);

    element.addDisconnectedCallback(() => ("unsubscribe" in unsub ? unsub.unsubscribe() : unsub()));

    return store[0];
}
