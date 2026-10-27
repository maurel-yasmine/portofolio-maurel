// ============================================================
// ⚙️ APP CONFIGURATION
// Small global settings (not personal data — that lives in Identity.ts).
// ============================================================

/**
 * Canonical production URL. Used for every canonical link, Open Graph URL,
 * JSON-LD `@id`, sitemap entry and robots.txt when VITE_DOMAIN is not set.
 * Change this (or set VITE_DOMAIN) if the site moves to another domain.
 */
export const DEFAULT_SITE_URL = "https://portofolio-maurel.vercel.app";

export const APP_CONFIG = {
  /** Added after the page title in <title> tags. */
  titleSuffix: "Portfolio",

  /** next-themes storage key. */
  themeStorageKey: "maurel-theme",

  /** How long a route transition takes, in seconds. */
  transitionDuration: 0.45,

  /** Breakpoints used by the ContainerProvider (in px). */
  tinyBreakpoint: 350,
  mobileBreakpoint: 768,

  /** Google Fonts families preloaded in index.html. */
  fonts: {
    sans: "Inter",
    heading: "Fraunces",
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
