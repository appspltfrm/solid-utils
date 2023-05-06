import { EffectFunction, Signal } from "solid-js";
import { Observer, Unsubscribable } from "type-fest";
export type SignalFromObservable<T> = [...Signal<T>, Unsubscribable];
interface ObservableLike<ValueType> {
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
export declare function createSignalFromObservable<T = any>(observable: ObservableLike<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;
export declare function createSignalFromObservable<T = any>(observable: ObservableLike<T>, options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined>;
export declare function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | ObservableLike<Prev>, ObservableLike<Next>>, options: InitialValueOption<Init> & Options): SignalFromObservable<Next>;
export declare function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | ObservableLike<Prev>, ObservableLike<Next>>, options?: CreateSignalFromObservableOption<Init | undefined>): SignalFromObservable<Next | undefined>;
export {};
