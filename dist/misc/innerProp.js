import { MessageRef as r, translate as o } from "@appspltfrm/js-intl";
import { HtmlString as e } from "@appspltfrm/js-utils/core";
function n(t) {
  return t instanceof r && (t = o(t)), t instanceof e ? { innerHTML: t.toString() } : { children: t };
}
export {
  n as innerProp
};
//# sourceMappingURL=innerProp.js.map
