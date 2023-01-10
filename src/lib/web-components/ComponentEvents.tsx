import {Simplify} from "type-fest";
import {ComponentEventDefinition} from "./ComponentEventDefinition";

export type ComponentEvents<
    Events extends {[P in EventName]: ComponentEventDefinition<EventType>},
    EventName extends keyof Events = keyof Events,
    EventType extends Event = Events[EventName] extends ComponentEventDefinition<infer T> ? T : never
> = Simplify<{[P in keyof Events]?: (Events[P] extends ComponentEventDefinition<infer T> ? ((ev: T) => void) : never)}>;
