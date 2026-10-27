import { Helmet } from "react-helmet-async";
import { JsonLd } from "@/components/JsonLd";
import { APP_CONFIG, DEFAULT_SITE_URL } from "@/config/AppConfig";
import { OWNER_NAME, PORTRAIT_IMAGE } from "@/config/Identity";
import { SITE_METADATA, buildJsonLd } from "@/config/Metadata";
import type { RoutePath } from "@/config/Metadata";

interface HelmetContainerProps {
  /** Which route's metadata to render. */
  page: RoutePath;
}

/**
 * Tags that HelmetContainer renders per route.
 *
 * The build-time <head> (see src/config/Head.ts) is what crawlers and
 * link-preview bots read, because they do not run JavaScript. Once the app
 * boots in a real browser, react-helmet-async renders its own copies of these
 * tags — so main.tsx removes the static ones first to avoid duplicates such as
 * two <title> tags or two canonical links.
 *
 * `<meta name="theme-color">` is intentionally NOT removed: it is a light/dark
 * media pair that Helmet does not render.
 */
const HELMET_MANAGED_SELECTORS = [
  "title",
  'meta[name="description"]',
  'meta[name="keywords"]',
  'meta[name="author"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
];

/**
 * Removes the static copies of the Helmet-managed tags. Browser-only.
 *
 * This helper deliberately lives next to the component that renders these tags
 * so the two stay in sync. The react-refresh rule only applies to Vite's hot
 * reloading in development and is disabled for this one export.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function stripStaticHeadTags(): void {
  if (typeof document === "undefined") return;

  HELMET_MANAGED_SELECTORS.forEach((selector) => {
    document.head.querySelectorAll(selector).forEach((node) => {
      node.remove();
    });
  });
}

function resolveDomain(): string {
  const fromEnv = import.meta.env.VITE_DOMAIN;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/+$/, "");
  }

  // Always canonicalise to the production domain — never to the current
  // origin, so a local dev server cannot leak localhost into the head tags.
  return DEFAULT_SITE_URL;
}

/**
 * Renders every <head> tag for a page: title, description, Open Graph,
 * Twitter cards and the JSON-LD structured data graph.
 */
export function HelmetContainer({ page }: HelmetContainerProps) {
  const meta = SITE_METADATA[page];
  const domain = resolveDomain();
  const canonical = page === "/" ? `${domain}/` : `${domain}${page}`;
  const ogImage = `${domain}${PORTRAIT_IMAGE}`;
  const jsonLd = JSON.stringify(buildJsonLd(domain));
  const faqJsonLd = meta.faq
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      })
    : null;

  return (
    <>
      <Helmet>
      <html lang="en" />
      <title>{`${meta.title} ${APP_CONFIG.titleSuffix}`.trim()}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords.join(", ")} />
      <meta name="author" content={OWNER_NAME} />
      <meta name="robots" content={page === "/404" ? "noindex, follow" : "index, follow"} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={OWNER_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* Structured data is injected directly into <head> (see JsonLd). */}
      <JsonLd id="graph" json={jsonLd} />
      {faqJsonLd && <JsonLd id="faq" json={faqJsonLd} />}
    </>
  );
}
