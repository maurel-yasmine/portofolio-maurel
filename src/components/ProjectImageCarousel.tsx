import { useCallback, useRef, useState } from "react";

interface ProjectImageCarouselProps {
  /** One or more screenshot paths. A single image renders without controls. */
  images: string[];
  /** Used for the alt text. */
  alt: string;
  className?: string;
  /** Opens the fullscreen lightbox at the tapped image. */
  onImageClick?: (index: number) => void;
}

/**
 * Screenshot viewer used inside the project modals.
 *
 * Navigation is touch-native: the track is a snap-scrolling container, so
 * mobile users swipe left/right and desktop users can drag/scroll. There are
 * no arrow overlays covering the dashboard; only the counter badge sits on the
 * image, with small dots below it for direct access.
 *
 * Tapping an image calls `onImageClick` so the modal can open the lightbox.
 */
export function ProjectImageCarousel({
  images,
  alt,
  className = "",
  onImageClick,
}: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const total = images.length;

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || total <= 1) return;

    const width = track.clientWidth || 1;
    const next = Math.min(Math.max(Math.round(track.scrollLeft / width), 0), total - 1);
    setIndex((current) => (current === next ? current : next));
  }, [total]);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * target, behavior: "smooth" });
    setIndex(target);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {images.map((src, imageIndex) => (
          <div key={`${src}-${imageIndex}`} className="w-full shrink-0 snap-center">
            <button
              type="button"
              onClick={() => onImageClick?.(imageIndex)}
              aria-label={`Open screenshot ${imageIndex + 1} of ${total} fullscreen`}
              className="block w-full cursor-zoom-in"
            >
              <img
                src={src}
                alt={total > 1 ? `${alt} — screenshot ${imageIndex + 1} of ${total}` : alt}
                draggable={false}
                className="aspect-video w-full select-none bg-white object-contain dark:bg-[#141014]"
              />
            </button>
          </div>
        ))}
      </div>

      {total > 1 && (
        <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-ink/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {index + 1}/{total}
        </span>
      )}

      {total > 1 && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {images.map((image, dotIndex) => (
            <button
              key={`${image}-dot-${dotIndex}`}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to screenshot ${dotIndex + 1}`}
              aria-current={dotIndex === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "w-4 bg-rose-deep dark:bg-rose"
                  : "w-1.5 bg-border-soft hover:bg-rose/50 dark:bg-[#33262e]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
