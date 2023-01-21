export function renderRoot(root, options) {
  return function (elementConstructor) {
    elementConstructor.__noShadow = root === "element";
    if (root === "shadow") {
      elementConstructor.__shadowStyles = options?.styles;
    }
  };
}