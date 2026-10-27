// ============================================================
// ✏️ EDIT YOUR IDENTITY HERE
// This is the ONLY place where your name, role, email and social
// links are written. Change them here and they update everywhere
// on the website (navbar, hero, footer, SEO tags, linktree...).
// ============================================================

/** Your full name — this is the one real piece of content on the site. */
export const OWNER_NAME = "Maurel Chairinniswah Yasmine";

/** Short alias / handle, used for small labels and the favicon. */
export const OWNER_ALIAS = "maurel";

/** What you do. Shown in the hero, about section and SEO tags. */
export const JOB_TITLE = "Data Engineer, Data Analyst & Business Intelligence Enthusiast";

/** One-line summary. Keep it short — it is used in social previews. */
export const HEADLINE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

/** Public contact email. Placeholder value — replace with your own. */
export const CONTACT_EMAIL = "echamaurel@gmail.com";

/** Secondary email (shown on the linktree page). */
export const CONTACT_EMAIL_SECONDARY = "maurel.yasmine@binus.ac.id";

/**
 * Web-compose links. These open the compose window in the browser instead of
 * triggering the operating system's "choose a mail app" dialog.
 */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;
export const OUTLOOK_COMPOSE_URL = `https://outlook.office.com/mail/deeplink/compose?to=${CONTACT_EMAIL_SECONDARY}`;

/**
 * WhatsApp number in international format, digits only (no +, no spaces).
 * Example: 6281234567890
 */
export const WHATSAPP_NUMBER = "628991185585";

/** Where you are based. Dummy text on purpose. */
export const LOCATION = "Jakarta, Indonesia";

/** Social profiles. Replace REPLACE_ME with your real usernames. */
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/maurel-chairinniswah-yasmine",
  github: "https://github.com/maurel-yasmine",
  instagram: "https://www.instagram.com/REPLACE_ME",
  email: GMAIL_COMPOSE_URL,
} as const;

/** Resume files. Drop your real PDFs into public/pdf/ with these names. */
export const RESUME = {
  en: "/pdf/resume-en.pdf",
  id: "/pdf/resume-id.pdf",
} as const;

/** Profile photo shown in the about section. */
export const PORTRAIT_IMAGE = "/maurel-pfp.jpg";

/** Wide cover image used on the linktree page. */
export const COVER_IMAGE = "/img/cover.png";

/** Builds a WhatsApp chat link, optionally with a pre-filled message. */
export const whatsappUrl = (msg?: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

/** Builds a mailto link. */
export const mailtoUrl = (email: string = CONTACT_EMAIL): string => `mailto:${email}`;

/** The site title suffix used in <title> tags. */
export const SITE_NAME = OWNER_NAME;
