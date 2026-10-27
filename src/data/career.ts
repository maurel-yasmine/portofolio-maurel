// ============================================================
// ✏️ EDIT YOUR STORY / EXPERIENCE HERE — replace the dummy text below
// ============================================================

import type { IconComponent } from "./icons";
import { Briefcase, School, Sparkles } from "./icons";

export interface CareerEntry {
  period: string;
  role: string;
  place: string;
  detail: string;
  SvgIcon: IconComponent;
}

/** Dummy timeline used by the About section. */
export const CareerTimeline: CareerEntry[] = [
  {
    period: "2023 — 2024",
    role: "Lorem Ipsum Analyst Intern",
    place: "Dolor Sit Amet Corp.",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    SvgIcon: Briefcase,
  },
  {
    period: "2022 — 2023",
    role: "Consectetur Data Scholar",
    place: "Adipiscing Institute",
    detail:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    SvgIcon: School,
  },
  {
    period: "2021 — 2022",
    role: "Sed Eiusmod Community Lead",
    place: "Tempor Organization",
    detail:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    SvgIcon: Sparkles,
  },
];

/** Small stat pills used on the certifications + projects pages. */
export const LIBRARY_STATS = [
  { value: "06", label: "Projects" },
  { value: "05", label: "Certificates" },
  { value: "06", label: "Categories" },
] as const;
