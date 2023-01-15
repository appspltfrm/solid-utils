import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { camelPropsToDashedAttrs } from "./camelPropsToDashedAttrs";
import { registerElement } from "./registerElement";
export function elementComponent(tagName, elementType) {
    registerElement(tagName, elementType);
    const extendedType = elementType;
    const template = (rawProps) => {
        const [, props, other] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);
        return <Dynamic component={tagName} {...camelPropsToDashedAttrs(props)} {...other}/>;
    };
    const component = template;
    component.tagName = tagName;
    component.events = () => component;
    component.required = () => component;
    return component;
}
//# sourceMappingURL=elementComponent.jsx.map