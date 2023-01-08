import * as path from "path";
import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({

    root: "src/test-web",

    resolve: {
        alias: {
            "@appspltfrm/solid-utils": path.resolve(__dirname, "./src/lib"),
        }
    },

    plugins: [
        solidPlugin({hot: false, typescript: {allowDeclareFields: true}}),
    ],

    server: {
        port: 3000,
    },

    build: {
        target: "esnext",
    }

})
