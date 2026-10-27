import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/data/icons";

interface ProjectImageCarouselProps {
  /** One or more screenshot paths. A single image renders without controls. */
  images: string[];
  /** Used for the alt text. */
  alt: string;
  className?: string;
}

/**
 * Screenshot viewer used inside the project modals.
 *
 * When a project has more than one image it becomes a carousel with
 * previous/next arrows, dot pagination and arrow-key support. With a single
 * image the controls are hidden entirely.
 *
 * Mount it with a `key` tied to the project so the index resets between
 * projects.
 */
export function ProjectImageCarousel({ images, alt, className = "" }: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go, total]);

  const safeIndex = Math.min(index, Math.max(total - 1, 0));
  const currentImage = images[safeIndex] ?? images[0];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border-soft bg-blush/20 dark:bg-white/5 ${className}`}
    >
      <img
        src={currentImage}
        alt={total > 1 ? `${alt} — screenshot ${safeIndex + 1} of ${total}` : alt}
        className="aspect-video w-full bg-white object-contain dark:bg-[#141014]"
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="glass-pill absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-lg text-ink transition hover:scale-110 hover:text-rose-deep dark:text-[#f3eaf0]"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="glass-pill absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-lg text-ink transition hover:scale-110 hover:text-rose-deep dark:text-[#f3eaf0]"
          >
            <ChevronRight />
          </button>

          <span className="absolute right-2 top-2 rounded-full bg-ink/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {safeIndex + 1}/{total}
          </span>

          <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
            {images.map((image, dotIndex) => (
              <button
                key={`${image}-${dotIndex}`}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to screenshot ${dotIndex + 1}`}
                aria-current={dotIndex === safeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === safeIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
