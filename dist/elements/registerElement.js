import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
const _tmpl$ = /*#__PURE__*/_$template(`<style></style>`, 2);
import { compose, noShadowDOM, register } from "component-register";
import { getCurrentElement, withSolid } from "solid-element";
import { splitProps } from "solid-js";
import { Fragment } from "solid-js/h/jsx-runtime";
export function registerElement(tagName, elementConstructor) {
  if (customElements.get(tagName)) {
    return;
  }
  const extendedConstructor = elementConstructor;
  const propsDefinitions = {
    __children: undefined
  };
  for (const prop of extendedConstructor.__reactive ?? []) {
    propsDefinitions[prop] = Object.assign({
      value: undefined
    });
  }
  const element = compose(register(tagName, propsDefinitions, {
    BaseElement: elementConstructor
  }), withSolid)(rawProps => {
    const shadow = !extendedConstructor.__noShadow;
    const shadowStyles = shadow && extendedConstructor.__shadowStyles;
    if (!shadow) {
      noShadowDOM();
    }
    const [children, props] = splitProps(rawProps, ["__children"]);
    const element = getCurrentElement();
    return _$createComponent(Fragment, {
      get children() {
        return [_$memo(() => shadowStyles && (typeof shadowStyles === "string" ? [shadowStyles] : shadowStyles).map(style => (() => {
          const _el$ = _tmpl$.cloneNode(true);
          _$insert(_el$, style);
          return _el$;
        })())), _$memo(() => element.template({
          props,
          children: children?.["__children"] ?? []
        }))];
      }
    });
  });
}