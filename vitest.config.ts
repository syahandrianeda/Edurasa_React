import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins:[
        tsconfigPaths(),
    ],
    test: {

        globals: true,

        environment: "jsdom",//;//"node",

        include: [
            "tests/**/*.test.ts",
        ],

    },

});