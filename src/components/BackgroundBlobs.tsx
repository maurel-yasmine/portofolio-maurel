interface BackgroundBlobsProps {
  /** `hero` blobs are larger and sit behind the headline. */
  variant?: "hero" | "section";
  className?: string;
}

const SIZES = {
  hero: ["h-64 w-64 tiny:h-72 tiny:w-72", "h-56 w-56 tiny:h-64 tiny:w-64", "h-72 w-72"],
  section: ["h-48 w-48", "h-56 w-56", "h-40 w-40"],
} as const;

/** Decorative blurred pastel blobs. Purely visual (aria-hidden). */
export function BackgroundBlobs({ variant = "section", className = "" }: BackgroundBlobsProps) {
  const sizes = SIZES[variant];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`blob animate-blob bg-blush/40 ${sizes[0]} -left-10 top-6 dark:bg-blush/15`}
      />
      <div
        className={`blob animate-blob bg-lavender/50 ${sizes[1]} right-0 top-1/3 dark:bg-lavender/10`}
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className={`blob animate-blob bg-rose/25 ${sizes[2]} bottom-0 left-1/3 dark:bg-rose/10`}
        style={{ animationDelay: "2.6s" }}
      />
    </div>
  );
}
