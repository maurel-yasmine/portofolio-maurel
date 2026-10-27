// ============================================================
// 🔎 SEO METADATA PER PAGE
// Each page gets a title, description, keywords and structured data.
// Everything here is dummy Lorem ipsum copy except your name.
// ============================================================

import { OWNER_NAME, JOB_TITLE, HEADLINE, PORTRAIT_IMAGE, SOCIAL_LINKS } from "./Identity.ts";

export type RoutePath =
  | "/"
  | "/projects"
  | "/about"
  | "/linktree"
  | "/contact"
  | "/404";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageMetadata {
  path: RoutePath;
  title: string;
  description: string;
  keywords: string[];
  schemaType: "WebSite" | "CollectionPage" | "AboutPage" | "ContactPage" | "ProfilePage";
  /** Short direct answer, used by the FAQ / rich-result structured data. */
  answer: string;
  faq?: FaqItem[];
}

const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

/** Every route of the website and its SEO metadata. */
export const SITE_METADATA: Record<RoutePath, PageMetadata> = {
  "/": {
    path: "/",
    title: `${OWNER_NAME} — ${JOB_TITLE}`,
    description: LOREM_LONG,
    keywords: [
      "data analyst",
      "business intelligence",
      "portfolio",
      "dashboard",
      "tableau",
      "power bi",
      OWNER_NAME,
    ],
    schemaType: "ProfilePage",
    answer: LOREM_SHORT,
    faq: [
      { question: "Lorem ipsum dolor sit amet?", answer: LOREM_LONG },
      { question: "Consectetur adipiscing elit sed do?", answer: LOREM_SHORT },
    ],
  },
  "/projects": {
    path: "/projects",
    title: `Projects — ${OWNER_NAME}`,
    description: LOREM_LONG,
    keywords: ["projects", "dashboards", "data visualization", "business intelligence"],
    schemaType: "CollectionPage",
    answer: LOREM_SHORT,
  },
  "/about": {
    path: "/about",
    title: `About — ${OWNER_NAME}`,
    description: LOREM_LONG,
    keywords: ["about", "data analyst", "story", "skills"],
    schemaType: "AboutPage",
    answer: LOREM_SHORT,
  },
  "/linktree": {
    path: "/linktree",
    title: `Links — ${OWNER_NAME}`,
    description: LOREM_LONG,
    keywords: ["links", "social", "contact"],
    schemaType: "ProfilePage",
    answer: LOREM_SHORT,
  },
  "/contact": {
    path: "/contact",
    title: `Contact — ${OWNER_NAME}`,
    description: LOREM_LONG,
    keywords: ["contact", "email", "whatsapp", "collaboration"],
    schemaType: "ContactPage",
    answer: LOREM_SHORT,
  },
  "/404": {
    path: "/404",
    title: `Page not found — ${OWNER_NAME}`,
    description: LOREM_SHORT,
    keywords: ["404", "not found"],
    schemaType: "WebSite",
    answer: LOREM_SHORT,
  },
};

/** Routes that should appear in sitemap.xml (404 excluded). */
export const SITEMAP_ROUTES: RoutePath[] = [
  "/",
  "/projects",
  "/about",
  "/linktree",
  "/contact",
];

/** JSON-LD graph: a Person + WebSite + Organization description. */
export function buildJsonLd(domain: string): Record<string, unknown> {
  const person = {
    "@type": "Person",
    "@id": `${domain}/#person`,
    name: OWNER_NAME,
    jobTitle: JOB_TITLE,
    description: HEADLINE,
    image: `${domain}${PORTRAIT_IMAGE}`,
    url: domain,
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.instagram],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${domain}/#website`,
    url: domain,
    name: OWNER_NAME,
    description: HEADLINE,
    inLanguage: "en",
    publisher: { "@id": `${domain}/#person` },
  };

  const organization = {
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    name: OWNER_NAME,
    url: domain,
    logo: `${domain}/favicon.svg`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, organization],
  };
}
