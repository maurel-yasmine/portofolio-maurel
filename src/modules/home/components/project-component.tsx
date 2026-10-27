import { motion } from "framer-motion";
import { SplitWords } from "@/components/SplitWords";
import type { Project } from "@/data/projects";
import { ArrowUpRight } from "@/data/icons";

interface ProjectComponentProps {
  project: Project;
  /** Row index — even rows put the image on the left. */
  index: number;
  onOpen: (project: Project) => void;
}

/** Per-character title animation shared by the rows. */
function CharTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.h3
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02 } },
      }}
      className={className}
      aria-label={text}
    >
      <SplitWords
        text={text}
        renderChar={(char, index) => (
          <motion.span
            key={`${char}-${index}`}
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-block"
          >
            {char}
          </motion.span>
        )}
      />
    </motion.h3>
  );
}

/** One alternating project row. */
export function ProjectComponent({ project, index, onOpen }: ProjectComponentProps) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`flex flex-col gap-5 md:items-center md:gap-8 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image column with a soft mask fade */}
      <div className="md:w-1/3">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open details for ${project.title}`}
          className={`group relative block w-full overflow-hidden rounded-3xl border border-border-soft bg-blush/20 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(201,190,234,0.45)] dark:bg-white/5 ${
            isReversed ? "mask-fade-left" : "mask-fade-right"
          }`}
        >
          <img
            src={project.srcImage}
            alt={project.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-lilac/25 via-transparent to-blush/25" />
        </button>
      </div>

      {/* Text column */}
      <div className="md:w-2/3">
        <span className="mb-3 inline-flex rounded-full border border-border-soft bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-rose-deep dark:bg-white/5 dark:text-rose">
          {project.category}
        </span>

        <CharTitle
          text={project.title}
          className="font-heading text-lg font-bold leading-snug tracking-tight text-ink tiny:text-xl sm:text-2xl dark:text-[#f3eaf0]"
        />

        <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-ink-muted">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-lavender/40 px-3 py-1 text-[11px] font-medium text-ink dark:bg-white/5 dark:text-[#f3eaf0]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex items-center gap-3">
            {project.icons.map((icon) => (
              <li key={icon.title} className="group relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-soft bg-white/70 text-xl text-ink transition group-hover:-translate-y-0.5 dark:bg-white/5 dark:text-[#f3eaf0]">
                  <icon.SvgIcon className="h-5 w-5" />
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-soft bg-white/95 px-2.5 py-0.5 text-[10px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#241c22]/95 dark:text-[#f3eaf0]"
                >
                  {icon.title}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-2 text-xs font-medium text-ink transition hover:-translate-y-0.5 hover:border-rose/60 hover:text-rose-deep dark:bg-white/5 dark:text-[#f3eaf0]"
          >
            Read more
            <ArrowUpRight className="text-sm" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
