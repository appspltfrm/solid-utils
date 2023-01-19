interface ShadowOptions {
    styles?: string | string[];
}

export function renderRoot(root: "shadow", options?: ShadowOptions): (elementConstructor: any) => void;
export function renderRoot(root: "element"): (elementConstructor: any) => void;
export function renderRoot(root: "element" | "shadow", options?: ShadowOptions) {
    return function(elementConstructor: any) {
        elementConstructor.__noShadow = root === "element";

        if (root === "shadow") {
            elementConstructor.__shadowStyles = options?.styles;
        }

    }
}
