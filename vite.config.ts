import * as path from "path";
import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({

    root: "src/test-web",

    resolve: {
        alias: {
            "stable": path.resolve(__dirname, "./src/lib"),
        }
    },

    plugins: [
        solidPlugin({hot: false}),
    ],

    server: {
        port: 3000,
    },

    build: {
        target: "esnext",
    }

})
