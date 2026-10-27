import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { InitialMotion } from "@/components/InitialMotion";
import { JOB_TITLE, OWNER_NAME, PORTRAIT_IMAGE } from "@/config/Identity";
import { Bulb, Heart, Rocket, Sparkles, Target, User } from "@/data/icons";

interface ConnectorLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const BADGES = [
  { id: "expertise", label: "Expertise", side: "left", SvgIcon: Target },
  { id: "exploring", label: "Exploring", side: "right", SvgIcon: Sparkles },
] as const;

/** Circular portrait with floating badges connected by dashed SVG lines. */
function PortraitCenterpiece() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<ConnectorLine[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const portrait = portraitRef.current;
    if (!container || !portrait) return;

    const containerRect = container.getBoundingClientRect();
    const portraitRect = portrait.getBoundingClientRect();
    const portraitCenter = {
      x: portraitRect.left - containerRect.left + portraitRect.width / 2,
      y: portraitRect.top - containerRect.top + portraitRect.height / 2,
    };

    const next: ConnectorLine[] = [];

    BADGES.forEach((badge) => {
      const node = badgeRefs.current[badge.id];
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const badgeCenter = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };

      // Stop the line at the portrait edge so it never crosses the photo.
      const radius = portraitRect.width / 2;
      const dx = portraitCenter.x - badgeCenter.x;
      const dy = portraitCenter.y - badgeCenter.y;
      const distance = Math.hypot(dx, dy) || 1;

      next.push({
        id: badge.id,
        x1: badgeCenter.x,
        y1: badgeCenter.y,
        x2: portraitCenter.x - (dx / distance) * radius,
        y2: portraitCenter.y - (dy / distance) * radius,
      });
    });

    setLines(next);
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(measure, 120);
    const second = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(initial);
      window.clearTimeout(second);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mb-8 flex h-[320px] w-full max-w-md items-center justify-center sm:h-[360px]"
    >
      {/* Dashed connector lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(201, 122, 147, 0.55)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Portrait */}
      <div
        ref={portraitRef}
        className="relative z-10 transition duration-500 hover:scale-[1.03]"
      >
        <img
          src={PORTRAIT_IMAGE}
          alt="Portrait of Maurel Chairinniswah Yasmine"
          className="h-56 w-56 rounded-full object-cover shadow-lg shadow-pink-100 md:h-64 md:w-64 dark:shadow-none"
        />
      </div>

      {/* Floating badges */}
      {BADGES.map((badge, index) => (
        <div
          key={badge.id}
          ref={(node) => {
            badgeRefs.current[badge.id] = node;
          }}
          className={`absolute z-20 ${badge.side === "left" ? "left-0 top-2" : "right-0 bottom-2"}`}
          style={{ animationDelay: `${index * 0.6}s` }}
        >
          <div className="glass-pill flex animate-float items-center gap-2 px-4 py-2.5 transition duration-300 hover:scale-105">
            <badge.SvgIcon className="text-base text-rose-deep dark:text-rose" />
            <span className="text-xs font-medium text-ink dark:text-[#f3eaf0]">{badge.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface AboutProps {
  /**
   * Heading for the standalone About route. When present it replaces the
   * default section title (and renders as the page's <h1>), so the header
   * always reads: badge → title, exactly like every other section.
   */
  pageTitle?: string;
}

/** About section: portrait centerpiece + bento grid of content cards. */
export function About({ pageTitle }: AboutProps = {}) {
  const HeadingTag = pageTitle ? "h1" : "h2";
  const headingText = pageTitle ?? "The Mind Behind The Code";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative px-4 py-12 sm:py-16"
    >
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <User />
          </span>
          <HeadingTag
            id="about-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl pb-1 overflow-visible dark:text-[#f3eaf0]"
          >
            {headingText}
          </HeadingTag>
        </header>

        <PortraitCenterpiece />

        {/* Name + role, shown right under the portrait */}
        <div className="mb-8 text-center">
          <p className="font-heading text-lg font-bold tracking-tight text-ink tiny:text-xl dark:text-[#f3eaf0]">
            {OWNER_NAME}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-rose-deep dark:text-rose">
            {JOB_TITLE}
          </p>
        </div>

        {/* Bento grid: two cards share the top row, one spans the full width below */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InitialMotion className="md:col-span-2">
            <article className="surface-card h-full p-5 transition duration-300 hover:-translate-y-1.5">
              <div className="mb-3 flex items-center gap-2">
                <Heart className="text-lg text-rose-deep dark:text-rose" />
                <h3 className="font-heading text-lg font-bold tracking-tight text-ink dark:text-[#f3eaf0]">
                  Who I Am
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-ink-muted">
                I am a Data Engineer and Data Analyst passionate about transforming raw, complex
                data into reliable data pipelines and strategic business insights. Specializing in
                ETL/ELT architecture, dimensional modeling, and interactive visualization, I bridge
                the gap between technical data infrastructure and executive decision-making.
              </p>
            </article>
          </InitialMotion>

          <InitialMotion delay={0.08}>
            <article className="surface-card h-full p-5 transition duration-300 hover:-translate-y-1.5">
              <div className="mb-3 flex items-center gap-2">
                <Bulb className="text-lg text-rose-deep dark:text-rose" />
                <h3 className="font-heading text-lg font-bold tracking-tight text-ink dark:text-[#f3eaf0]">
                  Experience
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-ink-muted">
                My experience spans building end-to-end data engineering systems and analytical
                dashboards. I design robust ETL workflows, construct Star Schema Data Warehouses
                using Pentaho, PySpark, PostgreSQL, and Google BigQuery, and analyze large-scale
                datasets using Python and SQL. Additionally, I translate complex data models into
                clear visual reports using Tableau and Power BI to drive data-informed business
                strategies.
              </p>
            </article>
          </InitialMotion>

          <InitialMotion delay={0.16} className="md:col-span-2 lg:col-span-3">
            <article className="surface-card h-full p-5 transition duration-300 hover:-translate-y-1.5">
              <div className="mb-3 flex items-center gap-2">
                <Rocket className="text-lg text-rose-deep dark:text-rose" />
                <h3 className="font-heading text-lg font-bold tracking-tight text-ink dark:text-[#f3eaf0]">
                  Vision &amp; Growth
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-ink-muted">
                My forward-looking focus is on deepening my expertise in large-scale data
                infrastructure, machine learning integration, and cloud computing. I am dedicated to
                continuous learning, with a vision to build scalable, efficient data architectures
                that drive real profitability and sustainable company growth.
              </p>
            </article>
          </InitialMotion>
        </div>
      </div>
    </section>
  );
}


