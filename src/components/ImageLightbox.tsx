import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Close } from "@/data/icons";

interface ImageLightboxProps {
  images: string[];
  /** Index of the image to show, or null when the lightbox is closed. */
  index: number | null;
  alt: string;
  onClose: () => void;
  /** Lets the lightbox change image with the arrow keys. */
  onIndexChange: (index: number) => void;
}

/**
 * Fullscreen image preview. Sits above the project modal (z-[200]) so the
 * dashboard can be inspected at full size and the modal's own close button is
 * never hidden behind it.
 */
export function ImageLightbox({ images, index, alt, onClose, onIndexChange }: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (images.length <= 1) return;

      if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image preview"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            <Close />
          </button>

          <motion.img
            key={images[index]}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            src={images[index]}
            alt={images.length > 1 ? `${alt} — screenshot ${index + 1} of ${images.length}` : alt}
            onClick={(event) => event.stopPropagation()}
            draggable={false}
            className="max-h-[88vh] w-auto max-w-[94vw] select-none rounded-lg object-contain shadow-2xl"
          />

          {images.length > 1 && (
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {index + 1} / {images.length}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
