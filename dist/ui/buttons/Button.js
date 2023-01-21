import { template as _$template } from "solid-js/web";
import { spread as _$spread } from "solid-js/web";
import { mergeProps as _$mergeProps } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { getOwner as _$getOwner } from "solid-js/web";
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
const _tmpl$ = /*#__PURE__*/_$template(`<slot></slot>`, 2),
  _tmpl$2 = /*#__PURE__*/_$template(`<label></label>`, 2);
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
import { Dynamic } from "solid-js/web";
import { CustomElement, elementComponent, reactive, renderRoot } from "../../elements";
import { innerProp } from "../../utils/innerProp";
import styles from "./Button.scss?inline";
export let ButtonElement = (_dec = renderRoot("shadow", {
  styles
}), _dec2 = reactive(), _dec3 = reactive(), _dec(_class = (_class2 = class ButtonElement extends CustomElement {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "href", _descriptor, this);
    _initializerDefineProperty(this, "text", _descriptor2, this);
  }
  template({
    props
  }) {
    const tag = props.href ? "a" : "button";
    const {
      text
    } = props;
    return _$createComponent(Dynamic, {
      component: tag,
      get children() {
        const _el$ = _tmpl$.cloneNode(true);
        _el$._$owner = _$getOwner();
        _$insert(_el$, text && (() => {
          const _el$2 = _tmpl$2.cloneNode(true);
          _$spread(_el$2, _$mergeProps(() => innerProp(text)), false, false);
          return _el$2;
        })());
        return _el$;
      }
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "href", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export const Button = elementComponent("appx-button", ButtonElement);