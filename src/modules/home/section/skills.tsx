import { Suspense, lazy } from "react";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { InitialMotion } from "@/components/InitialMotion";
import { SKILLS_HINT, SKILLS_SUB_HINT, SkillCategories } from "@/data/skills";
import { Code } from "@/data/icons";
import { SkillIcon } from "../components/skill-icon";

const Lottie = lazy(() =>
  import("@/components/Lottie").then((module) => ({ default: module.Lottie })),
);

/** Skills section: one pill label per category plus a wrapping icon row. */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
    >
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <Code />
          </span>
          <h2
            id="skills-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl pb-1 overflow-visible dark:text-[#f3eaf0]"
          >
            Tech Stack
          </h2>
          <p className="mt-2 text-xs text-ink-muted">{SKILLS_HINT}</p>
          <p className="text-sm italic text-ink-muted">{SKILLS_SUB_HINT}</p>
        </header>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10">
          <div className="flex flex-1 flex-col gap-6">
            {SkillCategories.map((category, index) => (
              <InitialMotion key={category.title} delay={index * 0.06}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                  <span className="min-w-[180px] rounded-full border-t border-border-soft bg-white/60 px-7 py-3 text-center text-sm font-medium text-ink shadow-xl backdrop-blur-md md:text-left dark:border-[#33262e] dark:bg-white/5 dark:text-[#f3eaf0]">
                    {category.title}
                  </span>

                  <ul className="flex flex-wrap gap-3 md:gap-5">
                    {category.skills.map((skill) => (
                      <SkillIcon key={skill.tooltip} skill={skill} />
                    ))}
                  </ul>
                </div>
              </InitialMotion>
            ))}
          </div>

          {/* Soft Lottie illustration (md and up) */}
          <div className="hidden w-56 shrink-0 md:block lg:w-64">
            <Suspense fallback={<div className="loader h-56 w-full" />}>
              <Lottie
                src="/lottie/skills.json"
                className="h-56 w-full lg:h-64"
                ariaLabel="Decorative animation"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
