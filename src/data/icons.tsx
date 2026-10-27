// ============================================================
// 🧩 ICON WRAPPERS
// Data files must never store icon *names* as strings — they store
// components. Every icon used on the site is wrapped here so it can
// be swapped in one place.
//
// ➕ HOW TO ADD A NEW ICON
//   1. Find it on https://react-icons.github.io/react-icons
//   2. Add it to the import block below
//   3. Copy an existing wrapper and rename it, for example:
//        export const Docker = ({ className }: IconProps) => (
//          <SiDocker className={className} aria-hidden="true" focusable="false" />
//        );
//   4. Use it in src/data/skills.ts or src/data/projects.ts
// ============================================================

import type { ComponentType } from "react";
import {
  SiApachespark,
  SiApachehive,
  SiApachehadoop,
  SiChartdotjs,
  SiCloudera,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglebigquery as SiBigQueryRaw,
  SiGooglecloud,
  SiGooglesheets,
  SiJavascript,
  SiJupyter,
  SiLaravel,
  SiLooker,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiQgis,
  SiR,
  SiSqlite,
} from "react-icons/si";
import {
  TbAnalyze,
  TbArrowDown,
  TbArrowRight,
  TbArrowUpRight,
  TbAward,
  TbBolt,
  TbBrain,
  TbBrandVscode,
  TbBriefcase,
  TbBulb,
  TbCalendarStats,
  TbCertificate,
  TbChartBar,
  TbChartDots,
  TbChartHistogram,
  TbChevronLeft,
  TbChevronRight,
  TbCircleCheck,
  TbClock,
  TbCode,
  TbDatabase,
  TbDownload,
  TbExternalLink,
  TbFileExcel,
  TbFileText,
  TbFileTypePdf,
  TbFolder,
  TbHeart,
  TbHome,
  TbMail,
  TbMapPin,
  TbMathFunction,
  TbMenu2,
  TbMoonStars,
  TbRocket,
  TbSchool,
  TbSearch,
  TbSend,
  TbSitemap,
  TbSparkles,
  TbSql,
  TbSun,
  TbTarget,
  TbTrendingUp,
  TbUser,
  TbX,
} from "react-icons/tb";
import { FaGithub, FaInstagram, FaMicrosoft, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

/** Props every wrapped icon accepts. */
export interface IconProps {
  className?: string;
}

/** The shape stored in data files: `{ SvgIcon: Python, title: "Python" }`. */
export type IconComponent = ComponentType<IconProps>;

/* ---------- Languages & Query ---------- */
export const Sql = ({ className }: IconProps) => (
  <TbSql className={className} aria-hidden="true" focusable="false" />
);
export const Python = ({ className }: IconProps) => (
  <SiPython className={className} aria-hidden="true" focusable="false" />
);
export const RLanguage = ({ className }: IconProps) => (
  <SiR className={className} aria-hidden="true" focusable="false" />
);
export const Javascript = ({ className }: IconProps) => (
  <SiJavascript className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Analytics & BI ---------- */
export const Tableau = ({ className }: IconProps) => (
  <TbChartHistogram className={className} aria-hidden="true" focusable="false" />
);
export const PowerBi = ({ className }: IconProps) => (
  <TbChartDots className={className} aria-hidden="true" focusable="false" />
);
export const LookerStudio = ({ className }: IconProps) => (
  <SiLooker className={className} aria-hidden="true" focusable="false" />
);
export const Excel = ({ className }: IconProps) => (
  <TbFileExcel className={className} aria-hidden="true" focusable="false" />
);
export const GoogleSheets = ({ className }: IconProps) => (
  <SiGooglesheets className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Data & Databases ---------- */
export const Postgresql = ({ className }: IconProps) => (
  <SiPostgresql className={className} aria-hidden="true" focusable="false" />
);
export const Mysql = ({ className }: IconProps) => (
  <SiMysql className={className} aria-hidden="true" focusable="false" />
);
export const BigQuery = ({ className }: IconProps) => (
  <SiBigQueryRaw className={className} aria-hidden="true" focusable="false" />
);
export const Pandas = ({ className }: IconProps) => (
  <SiPandas className={className} aria-hidden="true" focusable="false" />
);
export const Numpy = ({ className }: IconProps) => (
  <SiNumpy className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Tools & Platforms ---------- */
export const Jupyter = ({ className }: IconProps) => (
  <SiJupyter className={className} aria-hidden="true" focusable="false" />
);
export const Git = ({ className }: IconProps) => (
  <SiGit className={className} aria-hidden="true" focusable="false" />
);
export const Github = ({ className }: IconProps) => (
  <SiGithub className={className} aria-hidden="true" focusable="false" />
);
export const Figma = ({ className }: IconProps) => (
  <SiFigma className={className} aria-hidden="true" focusable="false" />
);
export const Vscode = ({ className }: IconProps) => (
  <TbBrandVscode className={className} aria-hidden="true" focusable="false" />
);
export const GoogleWorkspace = ({ className }: IconProps) => (
  <FcGoogle className={className} aria-hidden="true" focusable="false" />
);
export const GoogleCloud = ({ className }: IconProps) => (
  <SiGooglecloud className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Big data, ETL & engineering ---------- */
export const Hadoop = ({ className }: IconProps) => (
  <SiApachehadoop className={className} aria-hidden="true" focusable="false" />
);
export const ApacheSpark = ({ className }: IconProps) => (
  <SiApachespark className={className} aria-hidden="true" focusable="false" />
);
export const ApacheHive = ({ className }: IconProps) => (
  <SiApachehive className={className} aria-hidden="true" focusable="false" />
);
export const Laravel = ({ className }: IconProps) => (
  <SiLaravel className={className} aria-hidden="true" focusable="false" />
);
export const ChartJs = ({ className }: IconProps) => (
  <SiChartdotjs className={className} aria-hidden="true" focusable="false" />
);
export const Sqlite = ({ className }: IconProps) => (
  <SiSqlite className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Pentaho has no brand icon — a pipeline/flow glyph stands in. ---------- */
export const Pentaho = ({ className }: IconProps) => (
  <TbSitemap className={className} aria-hidden="true" focusable="false" />
);

/* ---------- RapidMiner has no brand icon — an analysis glyph stands in. ---------- */
export const RapidMiner = ({ className }: IconProps) => (
  <TbAnalyze className={className} aria-hidden="true" focusable="false" />
);

export const Qgis = ({ className }: IconProps) => (
  <SiQgis className={className} aria-hidden="true" focusable="false" />
);

export const Cloudera = ({ className }: IconProps) => (
  <SiCloudera className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Concept icons ---------- */
export const MachineLearning = ({ className }: IconProps) => (
  <TbBrain className={className} aria-hidden="true" focusable="false" />
);
export const Statistics = ({ className }: IconProps) => (
  <TbMathFunction className={className} aria-hidden="true" focusable="false" />
);
export const Database = ({ className }: IconProps) => (
  <TbDatabase className={className} aria-hidden="true" focusable="false" />
);
export const DocumentPdf = ({ className }: IconProps) => (
  <TbFileTypePdf className={className} aria-hidden="true" focusable="false" />
);
export const ReportText = ({ className }: IconProps) => (
  <TbFileText className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Social & contact ---------- */
export const Mail = ({ className }: IconProps) => (
  <TbMail className={className} aria-hidden="true" focusable="false" />
);
export const GithubFilled = ({ className }: IconProps) => (
  <FaGithub className={className} aria-hidden="true" focusable="false" />
);
export const LinkedinFilled = ({ className }: IconProps) => (
  <FaLinkedinIn className={className} aria-hidden="true" focusable="false" />
);
export const InstagramFilled = ({ className }: IconProps) => (
  <FaInstagram className={className} aria-hidden="true" focusable="false" />
);
export const WhatsappFilled = ({ className }: IconProps) => (
  <FaWhatsapp className={className} aria-hidden="true" focusable="false" />
);
export const Microsoft = ({ className }: IconProps) => (
  <FaMicrosoft className={className} aria-hidden="true" focusable="false" />
);

/* ---------- Interface icons ---------- */
export const Menu = ({ className }: IconProps) => (
  <TbMenu2 className={className} aria-hidden="true" focusable="false" />
);
export const Close = ({ className }: IconProps) => (
  <TbX className={className} aria-hidden="true" focusable="false" />
);
export const Sun = ({ className }: IconProps) => (
  <TbSun className={className} aria-hidden="true" focusable="false" />
);
export const Moon = ({ className }: IconProps) => (
  <TbMoonStars className={className} aria-hidden="true" focusable="false" />
);
export const ArrowDown = ({ className }: IconProps) => (
  <TbArrowDown className={className} aria-hidden="true" focusable="false" />
);
export const ArrowRight = ({ className }: IconProps) => (
  <TbArrowRight className={className} aria-hidden="true" focusable="false" />
);
export const ArrowUpRight = ({ className }: IconProps) => (
  <TbArrowUpRight className={className} aria-hidden="true" focusable="false" />
);
export const ExternalLink = ({ className }: IconProps) => (
  <TbExternalLink className={className} aria-hidden="true" focusable="false" />
);
export const ChevronLeft = ({ className }: IconProps) => (
  <TbChevronLeft className={className} aria-hidden="true" focusable="false" />
);
export const ChevronRight = ({ className }: IconProps) => (
  <TbChevronRight className={className} aria-hidden="true" focusable="false" />
);
export const Certificate = ({ className }: IconProps) => (
  <TbCertificate className={className} aria-hidden="true" focusable="false" />
);
export const Sparkles = ({ className }: IconProps) => (
  <TbSparkles className={className} aria-hidden="true" focusable="false" />
);
export const Heart = ({ className }: IconProps) => (
  <TbHeart className={className} aria-hidden="true" focusable="false" />
);
export const Search = ({ className }: IconProps) => (
  <TbSearch className={className} aria-hidden="true" focusable="false" />
);
export const Send = ({ className }: IconProps) => (
  <TbSend className={className} aria-hidden="true" focusable="false" />
);
export const MapPin = ({ className }: IconProps) => (
  <TbMapPin className={className} aria-hidden="true" focusable="false" />
);
export const Clock = ({ className }: IconProps) => (
  <TbClock className={className} aria-hidden="true" focusable="false" />
);
export const Code = ({ className }: IconProps) => (
  <TbCode className={className} aria-hidden="true" focusable="false" />
);
export const Bulb = ({ className }: IconProps) => (
  <TbBulb className={className} aria-hidden="true" focusable="false" />
);
export const Target = ({ className }: IconProps) => (
  <TbTarget className={className} aria-hidden="true" focusable="false" />
);
export const TrendingUp = ({ className }: IconProps) => (
  <TbTrendingUp className={className} aria-hidden="true" focusable="false" />
);
export const User = ({ className }: IconProps) => (
  <TbUser className={className} aria-hidden="true" focusable="false" />
);
export const Briefcase = ({ className }: IconProps) => (
  <TbBriefcase className={className} aria-hidden="true" focusable="false" />
);
export const School = ({ className }: IconProps) => (
  <TbSchool className={className} aria-hidden="true" focusable="false" />
);
export const Download = ({ className }: IconProps) => (
  <TbDownload className={className} aria-hidden="true" focusable="false" />
);
export const Home = ({ className }: IconProps) => (
  <TbHome className={className} aria-hidden="true" focusable="false" />
);
export const Folder = ({ className }: IconProps) => (
  <TbFolder className={className} aria-hidden="true" focusable="false" />
);
export const CalendarStats = ({ className }: IconProps) => (
  <TbCalendarStats className={className} aria-hidden="true" focusable="false" />
);
export const ChartBar = ({ className }: IconProps) => (
  <TbChartBar className={className} aria-hidden="true" focusable="false" />
);
export const Award = ({ className }: IconProps) => (
  <TbAward className={className} aria-hidden="true" focusable="false" />
);
export const Rocket = ({ className }: IconProps) => (
  <TbRocket className={className} aria-hidden="true" focusable="false" />
);
export const Bolt = ({ className }: IconProps) => (
  <TbBolt className={className} aria-hidden="true" focusable="false" />
);
export const CircleCheck = ({ className }: IconProps) => (
  <TbCircleCheck className={className} aria-hidden="true" focusable="false" />
);
