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
        emptyOutDir: true,
        lib: {
            entry: ["elements/index.ts", "ui/Button/index.ts", "utils/index.ts"],
            formats: ["es"]
        },
        rollupOptions: {
            output: {
                preserveModules: true,
                preserveModulesRoot: "src/lib",
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js"
            },
            // output: {
            //     entryFileNames: (entry) => {
            //         console.log(entry)
            //         return "[name].js";
            //     },
            //     chunkFileNames: (chunk) => {
            //         console.log(chunk);
            //         return "[name].js";
            //     }
            // },
            external: [
                /component-register/,
                /solid-element/,
                /solid-js(\/{0,1}).*/,
                /@co.mmons\/js-utils(\/{0,1}).*/
            ],
        },
    },
})