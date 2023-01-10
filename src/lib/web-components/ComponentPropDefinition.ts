export class ComponentPropDefinition<Type, Required extends boolean = false> {
    value?: Type;
    attribute?: string;
    notify?: boolean;
    reflect?: boolean;
    parse?: boolean;
}

