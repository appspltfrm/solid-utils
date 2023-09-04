import {Observable, Subscription} from "rxjs";
import {createMemo, EffectFunction, getOwner, onCleanup} from "solid-js";
import {createStore, SetStoreFunction, Store} from "solid-js/store";

type StoreValue = {};

export type StoreFromObservable<T extends StoreValue> = [get: Store<T>, set: SetStoreFunction<T>, subscription: Subscription];

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

    if (typeof observableOrMemo === "function") {

        type Memo = [Observable<T>, Store<T>, SetStoreFunction<T>, Subscription];
        const data = createMemo<Memo>((prev) => {

            const prevObservable = prev?.[0];
            const newObservable = observableOrMemo(prevObservable);

            if (prevObservable === newObservable) {
                return prev as Memo;
            }

            if (prev) {
                prev![3].unsubscribe();
            }

            return [newObservable, ...createStoreFromObservable(newObservable, options)];
        });

        // @ts-ignore
        return [() => data()[1](), (v: T) => data()[2](v), () => data()[3].unsubscribe()];
    }

    const [store, setStore] = createStore<T>((options?.value || {}) as any);

    const subscription = observableOrMemo.subscribe({
        next: (v: T) => setStore(() => v),
        error: (e: any) => options?.onError?.(e)
    });

    if (getOwner() && options?.autoUnsubscribe !== false) {
        onCleanup(() => subscription.unsubscribe());
    }

    return [store, setStore, subscription];
}
