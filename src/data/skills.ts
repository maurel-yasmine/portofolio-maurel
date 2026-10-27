// ============================================================
// ✏️ EDIT YOUR SKILLS HERE — replace the dummy text below
// ============================================================
// Each row is a category. Swap the icons and the `tooltip` labels
// for the tools you actually use. The icon components come from
// src/data/icons.tsx.
// ============================================================

import type { IconComponent } from "./icons";
import {
  BigQuery,
  Cloudera,
  Excel,
  Figma,
  Git,
  Github,
  GoogleSheets,
  GoogleWorkspace,
  Javascript,
  Jupyter,
  LookerStudio,
  Microsoft,
  Mysql,
  Numpy,
  Pandas,
  Postgresql,
  PowerBi,
  Python,
  Qgis,
  RapidMiner,
  RLanguage,
  Sql,
  Tableau,
  Vscode,
} from "./icons";

export interface Skill {
  SvgIcon: IconComponent;
  tooltip: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SkillCategories: SkillCategory[] = [
  {
    title: "Languages & Query",
    skills: [
      { SvgIcon: Sql, tooltip: "SQL" },
      { SvgIcon: Python, tooltip: "Python" },
      { SvgIcon: RLanguage, tooltip: "R" },
      { SvgIcon: Javascript, tooltip: "JavaScript" },
    ],
  },
  {
    title: "Analytics & BI",
    skills: [
      { SvgIcon: Tableau, tooltip: "Tableau" },
      { SvgIcon: PowerBi, tooltip: "Power BI" },
      { SvgIcon: LookerStudio, tooltip: "Looker Studio" },
      { SvgIcon: Excel, tooltip: "Microsoft Excel" },
      { SvgIcon: GoogleSheets, tooltip: "Google Sheets" },
      { SvgIcon: RapidMiner, tooltip: "RapidMiner" },
      { SvgIcon: Qgis, tooltip: "QGIS" },
    ],
  },
  {
    title: "Data & Databases",
    skills: [
      { SvgIcon: Postgresql, tooltip: "PostgreSQL" },
      { SvgIcon: Mysql, tooltip: "MySQL" },
      { SvgIcon: BigQuery, tooltip: "BigQuery" },
      { SvgIcon: Cloudera, tooltip: "Cloudera" },
      { SvgIcon: Pandas, tooltip: "Pandas" },
      { SvgIcon: Numpy, tooltip: "NumPy" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { SvgIcon: Jupyter, tooltip: "Jupyter" },
      { SvgIcon: Git, tooltip: "Git" },
      { SvgIcon: Github, tooltip: "GitHub" },
      { SvgIcon: Figma, tooltip: "Figma" },
      { SvgIcon: Vscode, tooltip: "VS Code" },
      { SvgIcon: GoogleWorkspace, tooltip: "Google Workspace" },
      { SvgIcon: Microsoft, tooltip: "Microsoft 365" },
    ],
  },
];

/** Small hint shown under the section heading. */
export const SKILLS_HINT = "You can hover the icon to show skill name.";
export const SKILLS_SUB_HINT =
  "Continuously learning and expanding my technical toolkit.";
