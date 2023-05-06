import {Accessor, createMemo, createSignal, getOwner, onCleanup, Setter, Signal} from "solid-js";
import {Observer, Unsubscribable} from "type-fest";

export type SignalFromObservable<T> = [...Signal<T>, Unsubscribable];

type NoInfer<T extends any> = [T][T extends any ? 0 : never];

interface ObservableLike<ValueType = unknown> {
    subscribe(observer?: Partial<Observer<ValueType>>): Unsubscribable;
}

interface InitialValueOption<T> {
    value: T;
}

export interface Options {
    onError?: (error: any) => void | any;
    autoUnsubscribe?: boolean;
}

interface CreateSignalFromObservableOption<T> extends Options, Partial<InitialValueOption<T>> {
}

export function createSignalFromObservable<T = any>(observable: ObservableLike<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;

export function createSignalFromObservable<T = any>(observable: ObservableLike<T>, options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined>;

export function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: (prev?: ObservableLike<Prev>) => ObservableLike<Next>, options: InitialValueOption<Init> & Options): SignalFromObservable<Init>;

export function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: (prev?: ObservableLike<Prev>) => ObservableLike<Next>, options?: CreateSignalFromObservableOption<Init | undefined>): SignalFromObservable<Next | undefined>;

export function createSignalFromObservable<T = any>(observableOrMemo: ObservableLike<T> | ((prev?: ObservableLike<T>) => ObservableLike<T>), options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined> {

    if (typeof observableOrMemo === "function") {

        type Memo = [ObservableLike<T>, Accessor<T | undefined>, Setter<T | undefined>, Unsubscribable];
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
