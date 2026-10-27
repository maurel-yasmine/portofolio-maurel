import { Suspense, lazy } from "react";
import { Loading } from "@/components/Loading";
import { SOCIAL_LINKS } from "@/config/Identity";
import { Award, Bolt, CalendarStats, ExternalLink, TrendingUp } from "@/data/icons";

/** The heavy calendar grid is code-split so the page paints instantly. */
const ContributionCalendar = lazy(() => import("./ContributionCalendar"));

const STAT_CARDS = [
  { label: "Current Streak", value: "12", unit: "days", SvgIcon: Bolt },
  { label: "Longest Streak", value: "48", unit: "days", SvgIcon: Award },
  { label: "Total Activity", value: "260", unit: "sessions", SvgIcon: TrendingUp },
] as const;

/**
 * Practice Consistency — a renamed, static-data version of the classic
 * contribution graph. All numbers and squares are hardcoded dummy data.
 */
export function ContributionsGithub() {
  return (
    <section
      aria-labelledby="practice-consistency-heading"
      className="relative z-10 px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="panel-soft p-5 tiny:p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush/40 text-xl text-rose-deep dark:bg-rose/10 dark:text-rose">
                <CalendarStats />
              </span>
              <div>
                <h2
                  id="practice-consistency-heading"
                  className="font-heading text-xl font-bold tracking-tight text-ink tiny:text-2xl dark:text-[#f3eaf0]"
                >
                  Practice Consistency
                </h2>
                <p className="mt-1 text-xs font-light text-ink-muted tiny:text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-2 text-xs font-medium text-ink transition hover:-translate-y-0.5 hover:border-rose/60 hover:text-rose-deep dark:bg-white/5 dark:text-[#f3eaf0]"
            >
              View Profile
              <ExternalLink className="text-sm" />
            </a>
          </div>

          <p className="mb-8 max-w-3xl text-sm font-light leading-relaxed text-ink-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STAT_CARDS.map((stat) => (
              <div
                key={stat.label}
                className="surface-card flex items-center gap-3 p-4 transition hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/50 text-lg text-rose-deep dark:bg-white/5 dark:text-rose">
                  <stat.SvgIcon />
                </span>
                <div>
                  <p className="text-lg font-semibold leading-none text-ink dark:text-[#f3eaf0]">
                    {stat.value}
                    <span className="ml-1 text-xs font-light text-ink-muted">{stat.unit}</span>
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Suspense
            fallback={
              <div className="space-y-3">
                <Loading rows={3} />
              </div>
            }
          >
            <ContributionCalendar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
