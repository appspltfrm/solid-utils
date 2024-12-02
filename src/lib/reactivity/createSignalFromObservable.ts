import {Observable, Subscription} from "rxjs";
import {Accessor, createEffect, createSignal, EffectFunction, getOwner, onCleanup, Signal} from "solid-js";

export type SignalFromObservable<T> = [...Signal<T>, Accessor<Subscription>];

interface InitialValueOption<T> {
    value: T;
}

export interface Options {
    onError?: (error: any) => void | any;
    autoUnsubscribe?: boolean;
}

interface CreateSignalFromObservableOption<T> extends Options, Partial<InitialValueOption<T>> {
}

export function createSignalFromObservable<T>(observable: Observable<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;

export function createSignalFromObservable<T>(observable: Observable<T>, options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined>;

export function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options: InitialValueOption<Init> & Options): SignalFromObservable<Next>;

export function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options?: CreateSignalFromObservableOption<Init | undefined>): SignalFromObservable<Next | undefined>;

export function createSignalFromObservable<T>(observableOrMemo: Observable<T> | EffectFunction<undefined | Observable<T>, Observable<T>>, options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined> {

    const [value, setValue] = createSignal<T | undefined>(options?.value);
    const [subscription, setSubscription] = createSignal<Subscription>(undefined!);

    const subscribe = (o: Observable<T>) => setSubscription(p => {
        p?.unsubscribe();
        return o.subscribe({
            next: (v: T) => setValue(() => v),
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

    return [value, setValue, subscription];
}
