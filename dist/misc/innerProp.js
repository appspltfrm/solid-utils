import { HtmlString as r } from "@co.mmons/js-utils/core";
import { MessageRef as o } from "../node_modules/@co.mmons/js-intl/_esm2015/MessageRef.js";
import { translate as e } from "../node_modules/@co.mmons/js-intl/_esm2015/translate.js";
function n(t) {
  return t instanceof o && (t = e(t)), t instanceof r ? { innerHTML: t.toString() } : { innerText: t };
}
export {
  n as innerProp
};
//# sourceMappingURL=innerProp.js.map
