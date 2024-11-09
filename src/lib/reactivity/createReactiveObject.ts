import {createSignal, Signal} from "solid-js";

export function createReactiveObject<T extends object>(initial: T): T {
    const signals: {[key: string | symbol]: Signal<any>} = {};
    for (const [key, value] of Object.entries(initial)) {
        signals[key] = createSignal(value);
    }

    const proxy = new Proxy<T>(signals as any, {

        getOwnPropertyDescriptor(target: T, p: string | symbol): PropertyDescriptor | undefined {
            console.log("getOwn§")
            return Reflect.getOwnPropertyDescriptor(target, p);
        },
        ownKeys(target) {
            return Reflect.ownKeys(target);
        },

        set(target: any, p: string | symbol, newValue: any, receiver: any) {
            //console.log(p, newValue)
            let signal = target[p] as Signal<any>;
            if (!signal) {
                signal = target[p] = createSignal<any>();
            }

            signal[1]((prev) => prev === newValue ? prev : newValue);

            return true;
        },

        get(target: any, p: string | symbol, receiver: any): any {
            let signal = target[p as keyof T] as Signal<any>;
            if (!signal) {
                signal = target[p] = createSignal<any>();
            }
            return signal[0]();
        }
    })
    return proxy;
}
