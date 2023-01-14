export type ComponentEvents<Type extends {[P in keyof Type]: Event}> = {[P in keyof Type as `on${Capitalize<string & P>}`]?: (ev: Type[P]) => void};
