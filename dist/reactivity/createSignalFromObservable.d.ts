import { Observable, Subscription } from "rxjs";
import { Accessor, EffectFunction, Signal } from "solid-js";
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
export declare function createSignalFromObservable<T>(observable: Observable<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;
export declare function createSignalFromObservable<T>(observable: Observable<T>, options?: CreateSignalFromObservableOption<T | undefined>): SignalFromObservable<T | undefined>;
export declare function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options: InitialValueOption<Init> & Options): SignalFromObservable<Next>;
export declare function createSignalFromObservable<Next extends Prev, Init = Next, Prev = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options?: CreateSignalFromObservableOption<Init | undefined>): SignalFromObservable<Next | undefined>;
export {};
