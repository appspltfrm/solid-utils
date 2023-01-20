import path from "path";
import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    root: "src/lib",

    plugins: [
        solidPlugin({
            babel: {
                plugins: [
                    ["@babel/plugin-proposal-decorators", {version: "legacy"}],
                    ["@babel/plugin-proposal-class-properties", {loose: true}]
                ]
            },
            hot: false,
            typescript: {allowDeclareFields: true}
        }),
    ],

    build: {
        outDir: path.resolve(__dirname, "dist"),
        sourcemap: true,
        lib: {
            entry: {
                elements: path.resolve(__dirname, "src/lib/elements/index.ts"),
                ui: path.resolve(__dirname, "src/lib/ui/index.ts"),
                utils: path.resolve(__dirname, "src/lib/utils/index.ts"),
            },
            formats: ["es"],
            fileName: (format, name) => `${name}/index.js`,
        },
        rollupOptions: {
            external: [
                "solid-js",
                "solid-js/web",
                /@co.mmons\/js-utils(\/{0,1}).*/
            ],
        },
    },
})
