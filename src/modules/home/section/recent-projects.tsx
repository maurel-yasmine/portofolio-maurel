import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { ArrowRight, Folder } from "@/data/icons";
import { Projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectComponent } from "../components/project-component";

const RECENT_COUNT = 4;

/** Home section: the four most recent projects as alternating rows. */
export function RecentProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const recent = Projects.slice(0, RECENT_COUNT);
  const total = Projects.length;

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section
      id="projects"
      aria-labelledby="recent-projects-heading"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
    >
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <Folder />
          </span>

          <h2
            id="recent-projects-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl pb-1 overflow-visible dark:text-[#f3eaf0]"
          >
            Recent Projects
          </h2>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-muted dark:bg-white/5">
            Total Built
            <span className="count-badge">{total}</span>
          </p>
        </header>

        <div className="flex flex-col gap-14 sm:gap-16">
          {recent.map((project, index) => (
            <ProjectComponent
              key={project.title}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/projects"
            className="glass-pill group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-ink transition hover:-translate-y-1 hover:text-rose-deep dark:text-[#f3eaf0]"
          >
            View all
            <span className="count-badge">{total}</span>
            projects
            <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <ProjectDetailModal project={selected} onClose={closeModal} />
    </section>
  );
}
