import {getOwner, onCleanup, Owner} from "solid-js";

type Vars = {[key: string | symbol]: any};
type VarName = string | symbol;

const allVars = new WeakMap<Owner, Vars>();

class VarValue {
    value: any;
    onDelete?: () => void;
}

function assertNotExists(vars: Vars | undefined, name: VarName) {
    if (vars && name in vars) {
        throw new Error(`Var ${String(name)} already exists`);
    }
}

function assertExists(vars: Vars | undefined, name: VarName) {
    if (vars && !(name in vars)) {
        throw new Error(`Var ${String(name)} not exists`);
    }
}

export function createContext<T>(name: string | symbol, initialValue: T): T;

export function createContext<T>(name: string | symbol, initialValue?: T) {

    const owner = getOwner();
    if (!owner) {
        throw new Error("No owner, cannot create context");
    }

    let vars = allVars.get(owner);
    assertNotExists(vars, name);

    if (!vars) {
        allVars.set(owner, vars = {});

        onCleanup(() => allVars.delete(owner));
    }

    vars[name] = initialValue;

    return initialValue;
}

export function setContext<T>(name: string | symbol, value: T): T {

    let owner = getOwner();
    if (!owner) {
        throw new Error("No owner, cannot set context");
    }

    while (owner) {

        const vars = allVars.get(owner);
        if (vars) {
            if (name in vars) {
                vars[name] = value;
                return value;
            }
        }

        owner = owner.owner;
    }

    return value;
}

export function getContext<T>(name: string | symbol): T | undefined {

    let owner = getOwner();
    if (!owner) {
        console.warn("No owner, cannot create context");
    }

    while (owner) {

        const vars = allVars.get(owner);
        if (vars) {
            if (name in vars) {
                return vars[name];
            }
        }

        owner = owner.owner;
    }
}
