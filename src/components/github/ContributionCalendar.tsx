const WEEKS = 53;
const DAYS = 7;

/**
 * Deterministic pseudo-random generator so the dummy calendar looks
 * organic but never changes between reloads (no network, no Math.random).
 */
function buildDummyGrid(): number[][] {
  let seed = 20240517;
  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const grid: number[][] = [];
  for (let week = 0; week < WEEKS; week += 1) {
    const column: number[] = [];
    for (let day = 0; day < DAYS; day += 1) {
      const value = next();
      const level = value > 0.86 ? 4 : value > 0.68 ? 3 : value > 0.46 ? 2 : value > 0.24 ? 1 : 0;
      column.push(level);
    }
    grid.push(column);
  }
  return grid;
}

const CONTRIBUTION_GRID = buildDummyGrid();

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-border-soft/45 dark:bg-white/[0.06]",
  1: "bg-blush dark:bg-rose/25",
  2: "bg-rose/70 dark:bg-rose/45",
  3: "bg-rose-deep/80 dark:bg-rose/70",
  4: "bg-lilac dark:bg-lilac/70",
};

/**
 * The heavy 53 x 7 calendar grid, kept in its own file so it can be
 * lazily code-split behind a Suspense skeleton.
 */
function ContributionCalendar() {
  return (
    <>
      <div className="scrollbar-hide overflow-x-auto pb-2">
        <div className="flex min-w-max gap-[3px]">
          {CONTRIBUTION_GRID.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((level, dayIndex) => (
                <span
                  key={dayIndex}
                  className={`h-2.5 w-2.5 rounded-[3px] transition-colors duration-200 ${LEVEL_CLASSES[level]}`}
                  title={`Lorem ipsum · level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-ink-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className={`h-2.5 w-2.5 rounded-[3px] ${LEVEL_CLASSES[level]}`} />
        ))}
        <span>More</span>
      </div>
    </>
  );
}

export default ContributionCalendar;
