import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: "/",
      includeAssets: ["erys.svg", "erys-512x512.png"],
      manifest: {
        short_name: "Visualize Goals",
        name: "Visualize Goals",
        icons: [
          {
            src: "erys.svg",
            sizes: "64x64 32x32 24x24 16x16 192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "erys-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#FFCB05",
        background_color: "#121212",
        lang: "pl",
      },
    }),
  ],
});
