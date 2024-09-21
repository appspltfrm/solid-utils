import { Accessor } from "solid-js";
export declare function createConnectedRef<T extends Node>(): [Accessor<T | undefined>, (ref: T) => void];
