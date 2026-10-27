// ============================================================
// ✏️ EDIT YOUR PROJECTS HERE
// ============================================================
// Each object below is ONE project card:
//   • title / category / description / tags  → the visible text
//   • srcImage                               → the card thumbnail in public/
//   • images                                 → extra screenshots for the modal carousel
//   • urlDirect                              → where the button links to
//   • linkText                               → the button label
//   • icons                                  → the tool icons (from src/data/icons.tsx)
// ============================================================

import type { IconComponent } from "./icons";
import {
  ApacheSpark,
  BigQuery,
  ChartBar,
  ChartJs,
  Database,
  DocumentPdf,
  Hadoop,
  MachineLearning,
  Mysql,
  Pentaho,
  Postgresql,
  PowerBi,
  Python,
  ReportText,
  Sqlite,
  Tableau,
} from "./icons";

export interface ProjectTech {
  SvgIcon: IconComponent;
  title: string;
}

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  urlDirect?: string;
  linkText?: string;
  /**
   * When set, the modal CTA downloads `urlDirect` using this file name
   * (instead of opening it in a new tab).
   */
  downloadName?: string;
  /** Card thumbnail. */
  srcImage: string;
  /** Screenshots shown in the modal carousel. Falls back to `srcImage`. */
  images?: string[];
  tags?: string[];
  icons: ProjectTech[];
}

export type ProjectCategory =
  | "Data Engineering"
  | "Data Engineering - End-to-End Pipeline"
  | "Big Data Project - E-Commerce Analytics"
  | "Data Visualization & Dashboard Design"
  | "Data Engineering - ETL Pipeline";

export const Projects: Project[] = [
  {
    title: "TechSignal Intelligence Trend Analytics",
    category: "Data Engineering",
    description:
      "An AI-powered technology trend analytics platform processing Hacker News discussions. I led the end-to-end data engineering lifecycle, from designing secure PostgreSQL schemas and building a PySpark ETL pipeline (Medallion Architecture), to implementing a Data Warehouse in Google BigQuery and interactive Tableau dashboards.",
    urlDirect: "https://github.com/maurel-yasmine",
    linkText: "Read more",
    srcImage: "/dashboard_1.png",
    images: ["/dashboard_1.png", "/dashboard_2.png", "/dashboard_3.png"],
    tags: ["PostgreSQL", "PySpark", "BigQuery", "Tableau"],
    icons: [
      { SvgIcon: Postgresql, title: "PostgreSQL" },
      { SvgIcon: ApacheSpark, title: "PySpark" },
      { SvgIcon: BigQuery, title: "BigQuery" },
      { SvgIcon: Tableau, title: "Tableau" },
    ],
  },
  {
    title: "Hotel Booking Analytics: ETL & BI System",
    category: "Data Engineering - End-to-End Pipeline",
    description:
      "Engineered an end-to-end data pipeline to process 6.51 million hotel booking records. My key contributions included developing the ETL workflows using Pentaho Data Integration to clean and transform the data, loading it into a MySQL star schema consisting of 1 fact and 11 dimension tables. Additionally, I designed interactive Power BI dashboards to analyze revenue and cancellation trends and co-authored the final analytical report.",
    urlDirect: "/Final Report Data Engineering.docx",
    linkText: "Read Report",
    downloadName: "Final Report Data Engineering.docx",
    srcImage: "/DatEng_dash_excSum.png",
    images: [
      "/DatEng_dash_excSum.png",
      "/DatEng_dash_cancel.png",
      "/DatEng_dash_revenue.png",
      "/DatEng_dash_cust.png",
    ],
    tags: ["Pentaho ETL", "Power BI", "MySQL", "Star Schema"],
    icons: [
      { SvgIcon: Pentaho, title: "Pentaho" },
      { SvgIcon: PowerBi, title: "Power BI" },
      { SvgIcon: Mysql, title: "MySQL" },
      { SvgIcon: ReportText, title: "Report" },
    ],
  },
  {
    title: "Big Data Architecture & Customer Satisfaction Prediction",
    category: "Big Data Project - E-Commerce Analytics",
    description:
      "Developed a Big Data architecture using Hadoop and Apache Spark to analyze the Brazilian Olist e-commerce dataset and predict customer satisfaction. My key contributions included Business Problem Definition, Infrastructure Decision Analysis, Visualization & Insight Generation, Documentation, and Project Coordination. The project featured ETL processing, machine learning classification (CatBoost and Random Forest), and an interactive dashboard to deliver actionable insights on logistics and customer experience.",
    urlDirect: "/Final Report Big Data Processing.pdf",
    linkText: "Read Report",
    downloadName: "Final Report Big Data Processing.pdf",
    srcImage: "/BDP_excSum.png",
    images: ["/BDP_excSum.png", "/BDP_delivery.png", "/BDP_redOrder.png"],
    tags: ["Big Data", "Apache Spark", "Machine Learning", "Power BI", "Data Architecture"],
    icons: [
      { SvgIcon: Hadoop, title: "Hadoop" },
      { SvgIcon: ApacheSpark, title: "Apache Spark" },
      { SvgIcon: PowerBi, title: "Power BI" },
      { SvgIcon: MachineLearning, title: "Machine Learning" },
    ],
  },
  {
    title: "EuroMart Sales & Profitability Dashboard",
    category: "Data Visualization & Dashboard Design",
    description:
      "Designed comprehensive data visualizations to analyze EuroMart's sales performance, from exploratory data analysis (EDA) to explanatory visualizations. The analysis covered profit distribution, the relationship between discounts and losses, and Pareto analysis to identify the product subcategories contributing to 80% of total sales. All analytical worksheets were integrated into a single interactive dashboard to monitor monthly trends and key business health metrics.",
    urlDirect: "/Final Report Data Visualization.pdf",
    linkText: "Read Report",
    downloadName: "Final Report Data Visualization.pdf",
    srcImage: "/DatViz.png",
    images: ["/DatViz.png"],
    tags: [
      "Data Visualization",
      "Dashboarding",
      "Data Storytelling",
      "Exploratory Data Analysis",
    ],
    icons: [
      { SvgIcon: Tableau, title: "Tableau" },
      { SvgIcon: ChartBar, title: "Analytics" },
      { SvgIcon: DocumentPdf, title: "Report (PDF)" },
    ],
  },
  {
    title: "Beauty E-Commerce Data Pipeline",
    category: "Data Engineering - ETL Pipeline",
    description:
      "Constructed an end-to-end ETL pipeline processing 2,000 beauty e-commerce transactions using Python. The project includes automated data cleaning, enrichment, and loading into SQLite, utilizing advanced analytical SQL—including window functions—to generate actionable business insights on top categories and profitable sales channels.",
    srcImage: "/beauty_dashboard.png",
    images: ["/beauty_dashboard.png"],
    tags: ["Python", "SQL", "SQLite", "Data Modeling"],
    icons: [
      { SvgIcon: Python, title: "Python" },
      { SvgIcon: Database, title: "SQL / Database" },
      { SvgIcon: ChartJs, title: "Chart.js" },
      { SvgIcon: Sqlite, title: "SQLite" },
    ],
  },
];

/** Derived from the projects above, so the filter tabs always stay in sync. */
export const ProjectCategories = [...new Set(Projects.map((project) => project.category))];
