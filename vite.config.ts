import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),

    VitePWA({
      registerType: "autoUpdate",

      injectRegister: false,//null,

      strategies: "injectManifest",
      devOptions: {
        enabled: true,
      },
      srcDir: "app",
      filename: "sw.ts",
     
      manifest: {
        name: "Edurasa",
        short_name: "Edurasa",
        description:
          "Platform e-MBS di SDN Ratujaya 1 sebagai One Stop Service Schools",

        start_url: "/",
        scope: "/",
        display: "standalone",

        background_color: "#ffffff",
        theme_color: "#ffffff",

        lang: "id",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      injectManifest: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,jpg,gif,jpeg,svg,webp,avif,woff2,webmanifest}",
        ],
      },
    }),
  ],

  build: {
    outDir: "build/client",
    // target: "es2015"
  },

  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
});
