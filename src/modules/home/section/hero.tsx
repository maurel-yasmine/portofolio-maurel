import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SplitWords } from "@/components/SplitWords";
import { LineWaves } from "@/components/LineWaves";
import { useContainer } from "@/context/ContainerProvider";
import {
  GMAIL_COMPOSE_URL,
  OUTLOOK_COMPOSE_URL,
  OWNER_NAME,
  SOCIAL_LINKS,
  whatsappUrl,
} from "@/config/Identity";
import { ArrowDown, GithubFilled, LinkedinFilled, Mail, WhatsappFilled } from "@/data/icons";
import type { IconComponent } from "@/data/icons";

const GREETING = "HELLO!";
const NAME_LINE = `I AM ${OWNER_NAME.toUpperCase()}`;

interface ContactBubble {
  label: string;
  url: string;
  SvgIcon: IconComponent;
}

/**
 * The five social/contact bubbles. Each is a real link:
 *  - LinkedIn / GitHub  → external, new tab
 *  - WhatsApp           → wa.me direct link
 *  - Email / Outlook    → web compose (no native mail-app dialog)
 */
const CONTACT_BUBBLES: ContactBubble[] = [
  { label: "LinkedIn", url: SOCIAL_LINKS.linkedin, SvgIcon: LinkedinFilled },
  { label: "GitHub", url: SOCIAL_LINKS.github, SvgIcon: GithubFilled },
  { label: "WhatsApp", url: whatsappUrl(), SvgIcon: WhatsappFilled },
  { label: "Email", url: GMAIL_COMPOSE_URL, SvgIcon: Mail },
  { label: "Outlook", url: OUTLOOK_COMPOSE_URL, SvgIcon: Mail },
];

/** Full-height hero with per-character GSAP entrance and a WebGL wave backdrop. */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { isMobile } = useContainer();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          ".hero-greeting",
          { opacity: 0, y: 14, filter: "blur(15px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: isMobile ? 0.4 : 0.7 },
        )
        .fromTo(
          ".hero-char",
          { opacity: 0, y: 10, rotate: -25, filter: "blur(15px)" },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            duration: isMobile ? 0.45 : 0.7,
            stagger: isMobile ? 0.02 : 0.05,
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-bubble",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.08 },
          "-=0.4",
        );
    }, root);

    return () => context.revert();
  }, [isMobile]);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-24 sm:pb-32"
    >
      {/* WebGL pastel wave backdrop. The alpha mask in `.hero-waves` fades the
          canvas into the page background, so there is no seam at the hero edge. */}
      <LineWaves className="hero-waves absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <p className="hero-greeting mb-4 text-[11px] font-medium uppercase tracking-[0.45em] text-rose-deep tiny:text-xs dark:text-rose">
          {GREETING}
        </p>

        <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl lg:text-5xl dark:text-[#f3eaf0]">
          <SplitWords text={NAME_LINE} charClassName="hero-char" />
        </h1>

        {/* Centred social / contact bubble row */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {CONTACT_BUBBLES.map((bubble, index) => {
            const isExternal = bubble.url.startsWith("http");
            return (
              <li
                key={bubble.label}
                className="hero-bubble"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <a
                  href={bubble.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={bubble.label}
                  className="group flex flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-rose to-lilac px-4 py-3 text-center text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)] transition duration-300 hover:scale-110 hover:rotate-3 sm:px-5 sm:py-3.5"
                >
                  <bubble.SvgIcon className="text-lg sm:text-xl" />
                  <span className="text-[9px] font-semibold leading-tight sm:text-[10px]">
                    {bubble.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 sm:bottom-28">
        <div className="flex flex-col items-center gap-2 text-ink-muted">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span>
          <ArrowDown className="animate-bounce-soft text-lg" />
        </div>
      </div>
    </section>
  );
}
