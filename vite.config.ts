import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Pages from "vite-plugin-pages";
import { fileURLToPath, URL } from "node:url";
import { viteHeadPlugin } from "./vite-plugin-head.ts";
import { DEFAULT_SITE_URL } from "./src/config/AppConfig.ts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Production URL by default; override with VITE_DOMAIN when needed.
  const domain = (env.VITE_DOMAIN || DEFAULT_SITE_URL).replace(/\/+$/, "");

  return {
    base: "/",
    plugins: [
      viteHeadPlugin(domain),
      tailwindcss(),
      react(),
      Pages({
        dirs: "src/pages",
        extensions: ["tsx"],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      // chart.js, lottie-web and the calendar grid are already lazy-loaded
      // chunks, so the remaining entry bundle (React, framer-motion, gsap)
      // is expected to be a little over the default warning limit.
      chunkSizeWarningLimit: 800,
    },
  };
});
