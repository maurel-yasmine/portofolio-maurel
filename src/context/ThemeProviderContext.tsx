import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/AppConfig";

interface ThemeProviderContextProps {
  children: ReactNode;
}

/**
 * Wraps the app with next-themes.
 *
 * `attribute="class"` adds `.dark` to <html>, which is what our
 * `@custom-variant dark` rule in src/index.css looks for.
 *
 * `scriptProps` note: next-themes renders an inline <script> whose only job is
 * to set the theme class *before* paint on server-rendered pages. This project
 * is a client-only SPA, and React 19 logs a warning for any <script> rendered
 * inside a component, so we give that script a non-executable type to keep the
 * console clean. The same job is done by the small inline bootstrap in
 * index.html, which runs before React and prevents any theme flash.
 */
export function ThemeProviderContext({ children }: ThemeProviderContextProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey={APP_CONFIG.themeStorageKey}
      scriptProps={{ type: "application/json" }}
    >
      {children}
    </ThemeProvider>
  );
}
