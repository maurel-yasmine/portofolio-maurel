import lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

interface LottieProps {
  /** Path to the .json animation inside the public/ folder. */
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /** Accessible description. Pass an empty string for a decorative animation. */
  ariaLabel?: string;
}

/** Small wrapper around lottie-web's SVG renderer. */
export function Lottie({
  src,
  className = "",
  loop = true,
  autoplay = true,
  ariaLabel = "Decorative animation",
}: LottieProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animation: AnimationItem = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay,
      path: src,
    });

    return () => {
      animation.destroy();
    };
  }, [src, loop, autoplay]);

  const decorative = ariaLabel.length === 0;

  return (
    <div
      ref={containerRef}
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative ? true : undefined}
    />
  );
}
