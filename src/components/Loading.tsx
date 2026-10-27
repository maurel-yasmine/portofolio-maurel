interface LoadingProps {
  /** Number of skeleton rows to draw. */
  rows?: number;
  className?: string;
}

/** Soft pastel skeleton used as a Suspense fallback. */
export function Loading({ rows = 3, className = "" }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`w-full space-y-3 ${className}`}
    >
      <div className="loader h-6 w-1/3" />
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="loader h-4" style={{ width: `${90 - index * 12}%` }} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
