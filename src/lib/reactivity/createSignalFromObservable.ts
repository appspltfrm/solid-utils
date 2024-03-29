import {Observable, Subscription} from "rxjs";
import {Accessor, createMemo, createSignal, EffectFunction, getOwner, onCleanup, Setter, Signal} from "solid-js";

export type SignalFromObservable<T> = [...Signal<T>, Subscription];

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

    if (typeof observableOrMemo === "function") {

        type Memo = [Observable<T>, Accessor<T | undefined>, Setter<T | undefined>, Subscription];
        const data = createMemo<Memo>((prev) => {

            const prevObservable = prev?.[0];
            const newObservable = observableOrMemo(prevObservable);

            if (prevObservable === newObservable) {
                return prev as Memo;
            }

            if (prev) {
                prev![3].unsubscribe();
            }

            return [newObservable, ...createSignalFromObservable(newObservable, options)];
        });

        // @ts-ignore
        return [() => data()[1](), (v: T) => data()[2](v), () => data()[3].unsubscribe()];
    }

    const [value, setValue] = createSignal<T | undefined>(options?.value);

    const subscription = observableOrMemo.subscribe({
        next: (v: T) => setValue(() => v),
        error: (e: any) => options?.onError?.(e)
    });

    if (getOwner() && options?.autoUnsubscribe !== false) {
        onCleanup(() => subscription.unsubscribe());
    }

    return [value, setValue, subscription];
}
