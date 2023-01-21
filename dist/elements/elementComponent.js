import { createComponent as _$createComponent } from "solid-js/web";
import { mergeProps as _$mergeProps } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
import { children, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { camelPropsToDashedAttrs } from "./camelPropsToDashedAttrs";
import { registerElement } from "./registerElement";
export function elementComponent(tagName, elementType) {
  registerElement(tagName, elementType);
  const extendedType = elementType;
  const template = rawProps => {
    const elementChildren = children(() => rawProps.children);
    const [, props, other] = splitProps(rawProps, ["children"], extendedType.__reactive ?? []);
    return _$createComponent(Dynamic, _$mergeProps({
      component: tagName
    }, () => camelPropsToDashedAttrs(props), other, {
      get __children() {
        return elementChildren.toArray();
      },
      get children() {
        return !extendedType.__noShadow && elementChildren;
      }
    }));
  };
  const component = template;
  component["tagName"] = tagName;
  component["events"] = () => component;
  component["required"] = () => component;
  return component;
}