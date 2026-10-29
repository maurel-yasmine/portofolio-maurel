import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SplitWords } from "@/components/SplitWords";
import { useContainer } from "@/context/ContainerProvider";
import { ArrowUpRight, Download } from "@/data/icons";

gsap.registerPlugin(ScrollTrigger);

const CV_FILE_NAME = "CV - Maurel Chairinniswah Yasmine.pdf";
const CV_PATH = `/${CV_FILE_NAME}`;

interface Slide {
  id: string;
  heading: string;
  metric: string;
  ctaLabel: string;
  ctaUrl: string;
  /** When set, the CTA downloads the file with this name. */
  downloadName?: string;
}

const SLIDES: Slide[] = [
  {
    id: "cv",
    heading: "DOWNLOAD CV",
    metric:
      "Explore my complete academic background, data engineering projects, and technical skill sets.",
    ctaLabel: "Download CV",
    ctaUrl: CV_PATH,
    downloadName: CV_FILE_NAME,
  },
];

/**
 * Pinned, scroll-scrubbed showcase.
 *
 * The panel uses CSS `position: sticky` while a GSAP ScrollTrigger only
 * *scrubs* the timeline. This keeps the pinned effect without the
 * `pinSpacing`/fixed-position overlap the previous `pin` implementation
 * caused against the floating navigation dock.
 */
export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useContainer();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const context = gsap.context(() => {
      gsap.set(".showcase-slide", { autoAlpha: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      SLIDES.forEach((_, index) => {
        const slide = `.showcase-slide-${index}`;
        const chars = `${slide} .showcase-char`;
        const isLast = index === SLIDES.length - 1;

        timeline
          .fromTo(
            slide,
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: isMobile ? 0.7 : 1 },
          )
          .fromTo(
            chars,
            { opacity: 0, y: 10, rotate: -25, filter: "blur(15px)" },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              duration: isMobile ? 0.4 : 0.6,
              stagger: isMobile ? 0.012 : 0.03,
            },
            "-=0.6",
          );

        // Only fade a slide out when another one follows it — otherwise the
        // pinned panel would sit empty for the rest of the scroll.
        if (!isLast) {
          timeline.to(slide, { autoAlpha: 0, y: -44, duration: isMobile ? 0.6 : 0.9 }, "+=0.6");
        }
      });

      timeline.to({}, { duration: 0.2 });
    }, container);

    return () => context.revert();
  }, [isMobile]);

  return (
    <section ref={containerRef} aria-label="Highlights" className="relative min-h-[200vh]">
      {/* Sticky panel: stays put while the section scrolls, then flows away */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4">
        <div className="relative h-full w-full max-w-4xl pb-28 pt-24">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`showcase-slide showcase-slide-${index} absolute inset-0 flex flex-col items-center justify-center px-4 text-center`}
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blush/50 text-xl text-rose-deep dark:bg-rose/10 dark:text-rose">
                <Download />
              </span>

              <h2 className="max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-7xl dark:text-[#f3eaf0]">
                <SplitWords text={slide.heading} charClassName="showcase-char" />
              </h2>

              <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-ink-muted">
                {slide.metric}
              </p>

              <a
                href={slide.ctaUrl}
                download={slide.downloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-wrap mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-lilac px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)] transition hover:-translate-y-0.5"
              >
                {slide.ctaLabel}
                <ArrowUpRight className="text-base" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
