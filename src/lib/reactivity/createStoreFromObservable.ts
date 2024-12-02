import {Observable, Subscription} from "rxjs";
import {Accessor, createEffect, createSignal, EffectFunction, getOwner, onCleanup, untrack} from "solid-js";
import {createStore, SetStoreFunction, Store} from "solid-js/store";

type StoreValue = {};

export type StoreFromObservable<T extends StoreValue> = [get: Store<T>, set: SetStoreFunction<T>, subscription: Accessor<Subscription>];

interface InitialValueOption<T> {
    value: T;
}

export interface Options {
    onError?: (error: any) => void | any;
    autoUnsubscribe?: boolean;
}

interface CreateStoreFromObservableOption<T extends StoreValue> extends Options, Partial<InitialValueOption<T>> {
}

export function createStoreFromObservable<T extends StoreValue, Init extends Partial<T>>(observable: Observable<T>, options: InitialValueOption<Init> & Options): StoreFromObservable<T & Init>;

export function createStoreFromObservable<T extends StoreValue, Init extends Partial<T>>(observable: Observable<T>, options?: CreateStoreFromObservableOption<Init>): StoreFromObservable<T & Init>;

export function createStoreFromObservable<Next extends Prev, Prev extends StoreValue = Next, Init extends StoreValue = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options: InitialValueOption<Init> & Options): StoreFromObservable<Next>;

export function createStoreFromObservable<Next extends Prev, Prev extends StoreValue = Next, Init extends StoreValue = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options?: CreateStoreFromObservableOption<Init>): StoreFromObservable<Next>;

export function createStoreFromObservable<T extends StoreValue>(observableOrMemo: Observable<T> | EffectFunction<undefined | Observable<T>, Observable<T>>, options?: CreateStoreFromObservableOption<T>): StoreFromObservable<T> {

    const [store, setStore] = createStore<T>((options?.value || {}) as any);
    const [subscription, setSubscription] = createSignal<Subscription>(undefined!);

    const subscribe = (o: Observable<T>) => setSubscription(p => {
        p?.unsubscribe();
        return o.subscribe({
            next: (v: T) => setStore(() => v),
            error: (e: any) => options?.onError?.(e)
        })
    })

    if (typeof observableOrMemo === "function") {
        createEffect<Observable<T> | undefined>(prev => {
            const obs = observableOrMemo(prev);
            if (obs === prev) {
                return prev;
            }
            subscribe(obs)
            return obs
        })
    } else {
        subscribe(observableOrMemo)
    }

    if (getOwner() && options?.autoUnsubscribe !== false) {
        onCleanup(() => subscription()?.unsubscribe());
    }

    return [store, setStore, subscription];
}
