import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { InitialMotion } from "@/components/InitialMotion";
import { GMAIL_COMPOSE_URL, OUTLOOK_COMPOSE_URL, whatsappUrl } from "@/config/Identity";
import { ArrowUpRight, Heart, Mail, WhatsappFilled } from "@/data/icons";
import type { IconComponent } from "@/data/icons";

interface DirectContact {
  id: string;
  label: string;
  value: string;
  url: string;
  SvgIcon: IconComponent;
}

const DIRECT_CONTACTS: DirectContact[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+62 899 1185 585",
    url: whatsappUrl(),
    SvgIcon: WhatsappFilled,
  },
  {
    id: "email",
    label: "Email",
    value: "echamaurel@gmail.com",
    url: GMAIL_COMPOSE_URL,
    SvgIcon: Mail,
  },
  {
    id: "outlook",
    label: "Outlook",
    value: "maurel.yasmine@binus.ac.id",
    url: OUTLOOK_COMPOSE_URL,
    SvgIcon: Mail,
  },
];

interface ContactModuleProps {
  /**
   * Standalone pages need extra top padding to clear the fixed navigation.
   * When embedded on the home page (below Tech Stack) the normal section
   * rhythm is enough.
   */
  standalone?: boolean;
}

/**
 * "Get In Touch" contact section. It is reused on the home page (directly
 * below Tech Stack) and on the /contact route.
 */
export function ContactModule({ standalone = false }: ContactModuleProps = {}) {
  // On its own route the section is the page's main heading; embedded on the
  // home page it becomes a section heading under the hero's h1.
  const HeadingTag = standalone ? "h1" : "h2";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative overflow-hidden px-4 pb-16 ${
        standalone ? "pt-28" : "pt-12 sm:pt-16"
      }`}
    >
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <header className={`text-center ${standalone ? "mb-12" : "mb-8"}`}>
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <Heart />
          </span>
          <HeadingTag
            id="contact-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl pb-1 overflow-visible dark:text-[#f3eaf0]"
          >
            Get In Touch
          </HeadingTag>
        </header>

        <InitialMotion>
          <div className="panel-soft p-5 tiny:p-6 sm:p-8">
            <ul className="flex flex-col gap-3">
              {DIRECT_CONTACTS.map((contact) => {
                const isExternal = contact.url.startsWith("http");
                return (
                  <li key={contact.id}>
                    <a
                      href={contact.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-border-soft bg-white/60 px-4 py-4 transition hover:-translate-y-1 hover:border-rose/60 dark:bg-white/5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-lilac text-lg text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)] transition group-hover:scale-110">
                        <contact.SvgIcon />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                          {contact.label}
                        </span>
                        <span className="block break-words text-[0.85rem] leading-snug text-ink dark:text-[#f3eaf0]">
                          {contact.value}
                        </span>
                      </span>
                      <ArrowUpRight className="text-base text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </InitialMotion>
      </div>
    </section>
  );
}
