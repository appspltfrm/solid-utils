import { Accessor } from "solid-js";
export declare function createConnectedElementSignal<T extends Element>(element?: T): [Accessor<T | undefined>, (ref: T) => void];
