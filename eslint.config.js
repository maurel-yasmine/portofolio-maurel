import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "public"]),

  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  /* Context files intentionally export a provider AND a hook. */
  {
    files: ["src/context/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  /* Node-side build files. */
  {
    files: ["vite.config.ts", "vite-plugin-head.ts", "eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
