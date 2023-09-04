import { Observable, Subscription } from "rxjs";
import { EffectFunction } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";
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
export declare function createStoreFromObservable<T extends StoreValue, Init extends Partial<T>>(observable: Observable<T>, options: InitialValueOption<Init> & Options): StoreFromObservable<T & Init>;
export declare function createStoreFromObservable<T extends StoreValue, Init extends Partial<T>>(observable: Observable<T>, options?: CreateStoreFromObservableOption<Init>): StoreFromObservable<T & Init>;
export declare function createStoreFromObservable<Next extends Prev, Prev extends StoreValue = Next, Init extends StoreValue = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options: InitialValueOption<Init> & Options): StoreFromObservable<Next>;
export declare function createStoreFromObservable<Next extends Prev, Prev extends StoreValue = Next, Init extends StoreValue = Next>(memo: EffectFunction<undefined | Observable<Prev>, Observable<Next>>, options?: CreateStoreFromObservableOption<Init>): StoreFromObservable<Next>;
export {};
