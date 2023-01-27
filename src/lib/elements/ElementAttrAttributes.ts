export type ElementAttrAttributes = {
    [Key in keyof any as `attr:${string & Key}`]?: string;
}
