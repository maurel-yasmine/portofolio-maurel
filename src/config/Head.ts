// ============================================================
// 🧠 BUILD-TIME HEAD / SEO GENERATOR  (runs in Node, not the browser)
// It produces the <head> HTML injected into index.html, plus
// sitemap.xml and robots.txt for both dev and production.
// ============================================================

import {
  OWNER_NAME,
  JOB_TITLE,
  HEADLINE,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  PORTRAIT_IMAGE,
} from "./Identity.ts";
import { SITE_METADATA, SITEMAP_ROUTES, buildJsonLd } from "./Metadata.ts";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Builds the default (home page) <head> block for index.html. */
export function buildHeadHtml(domain: string): string {
  const meta = SITE_METADATA["/"];
  const canonical = `${domain}/`;
  const ogImage = `${domain}${PORTRAIT_IMAGE}`;
  const jsonLd = JSON.stringify(buildJsonLd(domain));

  const tags: string[] = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(meta.keywords.join(", "))}" />`,
    `<meta name="author" content="${escapeHtml(OWNER_NAME)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta name="theme-color" content="#FFFBF7" media="(prefers-color-scheme: light)" />`,
    `<meta name="theme-color" content="#1A1418" media="(prefers-color-scheme: dark)" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,

    // Open Graph
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(OWNER_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="og:locale" content="en_US" />`,

    // Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,

    // Structured data (the client reuses this exact block, see components/JsonLd.tsx)
    `<script type="application/ld+json" data-jsonld="graph">${jsonLd}</script>`,
  ];

  // A couple of harmless "profile" hints that use the identity config.
  tags.push(
    `<meta name="profile:job_title" content="${escapeHtml(JOB_TITLE)}" />`,
    `<meta name="profile:headline" content="${escapeHtml(HEADLINE)}" />`,
    `<meta name="profile:email" content="${escapeHtml(CONTACT_EMAIL)}" />`,
    `<link rel="me" href="${escapeHtml(SOCIAL_LINKS.linkedin)}" />`,
  );

  return tags.join("\n    ");
}

/** Builds sitemap.xml from the route list. */
export function buildSitemapXml(domain: string): string {
  const today = new Date().toISOString().slice(0, 10);

  const urls = SITEMAP_ROUTES.map((route) => {
    const loc = route === "/" ? `${domain}/` : `${domain}${route}`;
    const priority = route === "/" ? "1.0" : "0.7";
    return [
      "  <url>",
      `    <loc>${escapeHtml(loc)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** Builds robots.txt that points crawlers at the sitemap. */
export function buildRobotsTxt(domain: string): string {
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${domain}/sitemap.xml`, ""].join("\n");
}
