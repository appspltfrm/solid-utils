import { MessageRef as r, translate as e } from "@appspltfrm/js-intl";
import { HtmlString as o } from "@appspltfrm/js-utils/core";
function n(t) {
  return t instanceof r && (t = e(t)), t instanceof o ? { innerHTML: t.toString() } : { innerText: t };
}
export {
  n as innerProp
};
//# sourceMappingURL=innerProp.js.map
