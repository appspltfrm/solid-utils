import type {Observable, Subscription} from "rxjs";
import {createSignal, getOwner, onCleanup, Signal} from "solid-js";

export type SignalFromObservable<T> = [...Signal<T>, Subscription];

interface InitialValueOption<T> {
    value: T;
}

export interface Options {
    onError?: (error: any) => void | any;
    autoUnsubscribe?: boolean;
}

interface CreateSignalFromOption<T> extends Options, Partial<InitialValueOption<T>> {
}

export function createSignalFrom<T = any>(observable: Observable<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;

export function createSignalFrom<T = any>(observable: Observable<T>, options: CreateSignalFromOption<T | undefined>): SignalFromObservable<T | undefined>;

export function createSignalFrom<T = any>(observable: Observable<T>, options?: CreateSignalFromOption<T | undefined>): SignalFromObservable<T | undefined> {

    const [value, setValue] = createSignal<T | undefined>(options?.value);

    const subscription = observable.subscribe({
        next: (v: T) => setValue(() => v),
        error: (e: any) => options?.onError?.(e)
    });

    if (getOwner() && options?.autoUnsubscribe !== false) {
        onCleanup(() => subscription.unsubscribe());
    }

    return [value, setValue, subscription];
}
