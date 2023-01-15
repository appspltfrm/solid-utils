import { JSX } from "solid-js/h/jsx-runtime";
export type ElementEventsProps<Element extends HTMLElement, Type extends {
    [P in keyof Type]: Event;
}> = {
    [P in keyof Type as `on${Capitalize<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
};
