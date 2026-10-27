import { useCallback, useMemo, useState } from "react";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { InitialMotion } from "@/components/InitialMotion";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { Folder, Search } from "@/data/icons";
import { ProjectCategories, Projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";

type CategoryFilter = ProjectCategory | "All";

const ALL: CategoryFilter = "All";

function matchesQuery(project: Project, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return true;

  const haystack = [
    project.title,
    project.category,
    ...(project.tags ?? []),
    ...project.icons.map((icon) => icon.title),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(needle);
}

/** Full project library with search, category tabs and a portal modal. */
export function ProjectsGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(ALL);
  const [selected, setSelected] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const map = new Map<CategoryFilter, number>([[ALL, Projects.length]]);
    ProjectCategories.forEach((item) => {
      map.set(
        item,
        Projects.filter((project) => project.category === item).length,
      );
    });
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      Projects.filter(
        (project) =>
          (category === ALL || project.category === category) &&
          matchesQuery(project, query),
      ),
    [category, query],
  );

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section aria-labelledby="projects-heading" className="relative overflow-hidden px-4 pb-16 pt-28">
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-6 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <Folder />
          </span>
          <h1
            id="projects-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink tiny:text-3xl sm:text-4xl pb-1 overflow-visible dark:text-[#f3eaf0]"
          >
            Project Library
          </h1>
        </header>

        {/* Stat pills */}
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          {[...counts.entries()].map(([label, count]) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-muted dark:bg-white/5"
            >
              {label}
              <span className="count-badge">{count}</span>
            </span>
          ))}
        </div>

        {/* Search */}
        <div className="mx-auto mb-5 max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted" />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, tag or tools"
              className="w-full rounded-full border border-border-soft bg-white/70 py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-muted/70 focus:border-rose/60 dark:bg-white/5 dark:text-[#f3eaf0]"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="scrollbar-hide mb-7 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
          {([ALL, ...ProjectCategories] as CategoryFilter[]).map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-rose to-lilac text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)]"
                    : "border border-border-soft bg-white/70 text-ink-muted hover:-translate-y-0.5 hover:text-rose-deep dark:bg-white/5"
                }`}
              >
                {item}
                <span className="ml-2 opacity-80">{counts.get(item) ?? 0}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm font-light text-ink-muted">
            No projects match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <InitialMotion key={project.title} delay={Math.min(index * 0.05, 0.3)}>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`Open details for ${project.title}`}
                  className="group surface-card flex h-full w-full flex-col overflow-hidden p-0 text-left transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_rgba(201,190,234,0.45)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.srcImage}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-lilac/45 via-blush/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-rose-deep backdrop-blur-sm dark:bg-[#241c22]/85 dark:text-rose">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-base font-bold leading-snug tracking-tight text-ink dark:text-[#f3eaf0]">
                      {project.title}
                    </h2>

                    {project.tags && project.tags.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-lavender/40 px-2.5 py-0.5 text-[10px] font-medium text-ink dark:bg-white/5 dark:text-[#f3eaf0]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-ink-muted">
                      {project.description}
                    </p>

                    <ul className="mt-4 flex items-center gap-2 pt-1">
                      {project.icons.map((icon) => (
                        <li
                          key={icon.title}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-base text-ink dark:text-[#f3eaf0]"
                          title={icon.title}
                        >
                          <icon.SvgIcon className="h-4 w-4" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </InitialMotion>
            ))}
          </div>
        )}
      </div>

      <ProjectDetailModal project={selected} onClose={closeModal} />
    </section>
  );
}

