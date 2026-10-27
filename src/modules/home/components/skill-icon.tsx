import type { Skill } from "@/data/skills";

interface SkillIconProps {
  skill: Skill;
}

/** One skill icon with a soft glow and a hover tooltip showing its name. */
export function SkillIcon({ skill }: SkillIconProps) {
  return (
    <li className="group relative">
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-75 rounded-full bg-blush/60 opacity-0 blur-md transition duration-300 group-hover:scale-125 group-hover:opacity-100 dark:bg-rose/20"
      />
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-2xl text-ink transition duration-300 group-hover:-translate-y-1 group-hover:border-border-soft dark:text-[#f3eaf0]">
        <skill.SvgIcon className="h-6 w-6" />
      </span>

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-soft bg-white/95 px-3 py-1 text-[11px] font-medium text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(232,160,180,0.35)] transition-opacity duration-200 group-hover:opacity-100 dark:bg-[#241c22]/95 dark:text-[#f3eaf0]"
      >
        {skill.tooltip}
      </span>
    </li>
  );
}
