interface ShadowOptions {
    styles?: string | string[];
}

export function renderRoot(root: "shadow", options?: ShadowOptions): (elementConstructor: any) => void;
export function renderRoot(root: "element"): (elementConstructor: any) => void;
export function renderRoot(root: "element" | "shadow", options?: ShadowOptions) {
    return function(elementConstructor: any) {

        if (root !== "shadow") {
            Object.defineProperty(elementConstructor.prototype, "renderRoot", {
                get() {
                    return this
                }
            });

        } else {
            elementConstructor.__shadowStyles = options?.styles;
        }
    }
}
