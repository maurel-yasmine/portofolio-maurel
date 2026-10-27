// ============================================================
// ✏️ EDIT YOUR CERTIFICATES HERE — replace the dummy text below
// ============================================================
// For each certificate:
//   1. Save the image in  public/img/certificate/  (e.g. sql.png)
//   2. Set image: "/img/certificate/sql.png"
//   3. Paste the public link (Google Drive, Credly, Coursera...) in `link`
// ============================================================

export interface Certificate {
  title: string;
  image: string;
  link: string;
}

const DRIVE_PLACEHOLDER = "https://drive.google.com/file/d/REPLACE_ME/view";

export const Certificates: Certificate[] = [
  {
    title: "Lorem Ipsum Data Analytics Fundamentals",
    image: "/img/certificate/dummy-1.png",
    link: DRIVE_PLACEHOLDER,
  },
  {
    title: "Dolor Sit Amet SQL for Analysts",
    image: "/img/certificate/dummy-2.png",
    link: DRIVE_PLACEHOLDER,
  },
  {
    title: "Consectetur Adipiscing Dashboard Design",
    image: "/img/certificate/dummy-3.png",
    link: DRIVE_PLACEHOLDER,
  },
  {
    title: "Sed Do Eiusmod Business Intelligence",
    image: "/img/certificate/dummy-4.png",
    link: DRIVE_PLACEHOLDER,
  },
  {
    title: "Tempor Incididunt Spreadsheet Modelling",
    image: "/img/certificate/dummy-5.png",
    link: DRIVE_PLACEHOLDER,
  },
];
