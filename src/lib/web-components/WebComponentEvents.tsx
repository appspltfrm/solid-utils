export type WebComponentEvents<K extends keyof any = any, T extends Event = Event> = { [P in K]: (ev?: T) => void };
