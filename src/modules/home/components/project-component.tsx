import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SplitWords } from "@/components/SplitWords";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";
import type { Project } from "@/data/projects";
import { ArrowUpRight, Close, Download, ExternalLink } from "@/data/icons";

interface ProjectComponentProps {
  project: Project;
  /** Row index — even rows put the image on the left. */
  index: number;
  onOpen: (project: Project) => void;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
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

/** Modal with the full, untruncated description and a CTA link. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-ink/35 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="panel-soft my-8 w-full max-w-2xl overflow-hidden bg-[var(--bg-elevated)] p-4 tiny:p-5 sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="mb-2 inline-flex rounded-full border border-border-soft px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-rose-deep dark:text-rose">
                  {project.category}
                </span>
                <h2
                  id="project-modal-title"
                  className="font-heading text-lg font-bold leading-snug tracking-tight text-ink tiny:text-xl sm:text-2xl dark:text-[#f3eaf0]"
                >
                  {project.title}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-soft text-lg text-ink-muted transition hover:text-rose-deep dark:text-[#f3eaf0]"
              >
                <Close />
              </button>
            </div>

            <div className="mb-4">
              <ProjectImageCarousel
                key={project.title}
                images={project.images?.length ? project.images : [project.srcImage]}
                alt={project.title}
              />
            </div>

            <p className="text-sm font-light leading-relaxed text-ink-muted">
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

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-5 dark:border-[#33262e]">
              <ul className="flex items-center gap-3">
                {project.icons.map((icon) => (
                  <li key={icon.title} className="group relative">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-soft text-xl text-ink dark:text-[#f3eaf0]">
                      <icon.SvgIcon className="h-5 w-5" />
                    </span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-soft bg-white/95 px-2.5 py-0.5 text-[10px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#241c22]/95 dark:text-[#f3eaf0]">
                      {icon.title}
                    </span>
                  </li>
                ))}
              </ul>

              {project.urlDirect && (
                <a
                  href={project.urlDirect}
                  download={project.downloadName}
                  target={project.downloadName ? undefined : "_blank"}
                  rel={project.downloadName ? undefined : "noopener noreferrer"}
                  className="shine-wrap inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-lilac px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)] transition hover:-translate-y-0.5"
                >
                  {project.linkText ?? "View Project"}
                  {project.downloadName ? (
                    <Download className="text-sm" />
                  ) : (
                    <ExternalLink className="text-sm" />
                  )}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
