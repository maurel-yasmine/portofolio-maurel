import { OWNER_NAME } from "@/config/Identity";

/** Single-line footer. Your name comes from src/config/Identity.ts. */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 px-4 pb-40 pt-8">
      <div className="mx-auto max-w-5xl border-t border-border-soft pt-6 text-center dark:border-[#33262e]">
        <p className="text-xs font-light leading-relaxed text-ink-muted tiny:text-sm">
          © {currentYear} Made by {OWNER_NAME} | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
