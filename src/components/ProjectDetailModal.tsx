import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";
import { Close, Download, ExternalLink } from "@/data/icons";
import type { Project } from "@/data/projects";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * The single project-detail modal used everywhere in the site.
 *
 * Layout: a height-capped flex column with a sticky, blurred header (category +
 * always-visible close button) and an internally scrolling body. That keeps the
 * close button reachable on mobile no matter how long the description is.
 */
export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxOpenRef = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = project ? (project.images?.length ? project.images : [project.srcImage]) : [];

  // Reset the lightbox whenever a different project is opened or the modal closes.
  useEffect(() => {
    setLightboxIndex(null);
  }, [project]);

  // Keep the Escape handler in sync without re-binding it on every lightbox change.
  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;
  }, [lightboxIndex]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // While the lightbox is open it owns the Escape key.
      if (event.key === "Escape" && !lightboxOpenRef.current) onClose();
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
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            key="project-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[130] flex items-center justify-center overflow-hidden bg-ink/35 p-3 backdrop-blur-sm sm:p-4"
            onClick={onClose}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-detail-title"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="panel-soft flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[var(--bg-elevated)]"
            >
              {/* Sticky header: category + permanent close button */}
              <header className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-4 border-b border-border-soft bg-white/80 px-4 py-3 backdrop-blur-md dark:border-[#33262e] dark:bg-[#241c22]/85 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <span className="mb-2 inline-flex rounded-full border border-border-soft px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-rose-deep dark:border-[#33262e] dark:text-rose">
                    {project.category}
                  </span>
                  <h2
                    id="project-detail-title"
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-soft bg-white/70 text-lg text-ink-muted transition hover:border-rose/60 hover:text-rose-deep dark:border-[#33262e] dark:bg-white/5 dark:text-[#f3eaf0]"
                >
                  <Close />
                </button>
              </header>

              {/* Internal scroll area */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
                <div className="mb-4">
                  <ProjectImageCarousel
                    key={project.title}
                    images={images}
                    alt={project.title}
                    onImageClick={setLightboxIndex}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox
        images={images}
        index={project ? lightboxIndex : null}
        alt={project?.title ?? ""}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>,
    document.body,
  );
}
