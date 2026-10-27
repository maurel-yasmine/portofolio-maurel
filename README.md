# Maurel Chairinniswah Yasmine — Personal Portfolio

A soft, pastel personal portfolio website for a **Data Analyst / Business Intelligence** student.
It is a single-page site with extra pages, and it is **frontend-only** — no database, no login, no API keys.

> 📸 **Screenshot placeholder**
> Replace this line with a screenshot of your website once it is running:
> `![Portfolio screenshot](docs/screenshot.png)`

---

## Table of contents

1. [What this website can do](#1-what-this-website-can-do)
2. [What you need before you start](#2-what-you-need-before-you-start)
3. [Run it on your computer, step by step](#3-run-it-on-your-computer-step-by-step)
4. [If something goes wrong (troubleshooting)](#4-if-something-goes-wrong-troubleshooting)
5. [Where to edit your own content](#5-where-to-edit-your-own-content)
6. [How to add your Tableau & Power BI projects](#6-how-to-add-your-tableau--power-bi-projects)
7. [How to change the pastel colours](#7-how-to-change-the-pastel-colours)
8. [How to change your name / branding everywhere at once](#8-how-to-change-your-name--branding-everywhere-at-once)
9. [Put it online for free (deploy)](#9-put-it-online-for-free-deploy)
10. [What every folder does](#10-what-every-folder-does)
11. [FAQ, licence and credits](#11-faq-licence-and-credits)

---

## 1. What this website can do

| Feature | What it means for you |
| --- | --- |
| **Hero section** | Big animated introduction with your name, a short tagline and three number counters. |
| **Pinned scroll showcase** | A section that "sticks" on screen and changes as you scroll, with buttons to your Tableau Public and LinkedIn. |
| **Recent projects** | Your newest projects shown as big alternating rows. Click one to open a pop-up with the full description. |
| **Project library page** (`/projects`) | All your projects in a searchable, filterable grid. |
| **Skills section** | Your tools (SQL, Tableau, Power BI, Python…) shown as icons with hover tooltips. |
| **Certifications** | A swipeable card stack on the home page and a full gallery on `/certification`. |
| **Practice consistency** | A calendar-style grid (like a GitHub contribution graph) showing your study/practice habit. |
| **About section** | Your photo, a short story and an "Analytics Snapshot" mini chart. |
| **Dark mode** | A day/night toggle in the bottom navigation, with a soft circular reveal animation. |
| **Linktree page** (`/linktree`) | One simple page with all your links, perfect for Instagram/TikTok bios. |
| **Contact page** (`/contact`) | A contact form (it only shows a success message — nothing is sent anywhere) plus your email and WhatsApp links. |
| **Works on phones** | The layout is tested from 320px (small phone) up to 1440px (large laptop). |
| **SEO ready** | Every page has its own title, description and social sharing preview. |

---

## 2. What you need before you start

You do **not** need to be a developer. You only need two things.

### A. Node.js (version 20 or newer)

**What is Node.js?**
Node.js is a program that lets your computer run JavaScript projects like this one.
`npm` (Node Package Manager) comes together with Node.js — it downloads the little building blocks this website needs.

**How to install it**

1. Open <https://nodejs.org> in your browser.
2. Download the big green button that says **LTS** (LTS means "Long Term Support" = the stable version). Pick version **20 or newer**.
3. Open the downloaded file and click **Next → Next → Install**. Keep all the default options.
4. **Restart your computer** (this helps the terminal find the new program).

**How to check it worked**

Open a terminal and type:

```bash
node -v
npm -v
```

You should see something like:

```
v20.11.1
10.2.4
```

The exact numbers do not matter, as long as `node -v` shows **v20** or higher and no error appears.

> ❗ If you see `'node' is not recognized`, close the terminal, restart your computer, and try again. If it still fails, reinstall Node.js and make sure you click **Add to PATH** during installation.

### B. A code editor — VS Code

1. Download **Visual Studio Code** from <https://code.visualstudio.com>.
2. Install it with the default options.

**Recommended VS Code extensions** (open VS Code → click the squares icon on the left → search the name → Install):

| Extension | Why you want it |
| --- | --- |
| **ESLint** | Shows small mistakes in your code while you type. |
| **Tailwind CSS IntelliSense** | Autocompletes colour and style names. |
| **Prettier – Code formatter** | Keeps your files neatly formatted. |
| **Error Lens** | Shows errors right next to the line that has them. |

---

## 3. Run it on your computer, step by step

### Step 0 — What is a "terminal"?

A terminal is a text window where you type commands instead of clicking buttons.

**To open a terminal inside VS Code:**

1. Open VS Code.
2. Menu: **Terminal → New Terminal** (or press `` Ctrl + ` ``).
3. A panel opens at the bottom. That is your terminal.

### Step 1 — Open the project folder

In VS Code: **File → Open Folder…** and choose this project folder (the one containing `package.json`).

### Step 2 — Install the building blocks (only the first time)

In the terminal, type this and press Enter:

```bash
npm install
```

**What it does:** downloads all the libraries the website needs into a folder called `node_modules`.

**Expected result:** a progress bar, then something like `added 222 packages in 3m`.
This can take a few minutes the first time. You only need to run it once (and again if someone tells you the dependencies changed).

### Step 3 — Start the website

```bash
npm run dev
```

**What it does:** starts a small local web server on your own computer.

**Expected result:**

```
  VITE v8.3.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

Now open <http://localhost:5173> in your browser. 🎉
The page reloads automatically every time you save a file.

**How to stop it:** click on the terminal and press **Ctrl + C**, then confirm with `Y` if asked.

### Step 4 — The other commands

```bash
npm run build      # creates the final website inside the dist/ folder
npm run preview    # shows the built website locally, to double-check it
npm run lint       # checks the code for mistakes and bad style
```

| Command | When to use it |
| --- | --- |
| `npm run dev` | While you are editing. Fast, auto-reloads. |
| `npm run build` | Before putting the site online. Creates the `dist/` folder. |
| `npm run preview` | To test the `dist/` folder exactly as visitors will see it. |
| `npm run lint` | Before saving your work, to catch typos and mistakes. |

> 💡 Tip: run `npm run dev` in one terminal and leave it running. When you need another command, open a **second** terminal with **Terminal → New Terminal**.

---

## 4. If something goes wrong (troubleshooting)

| Problem | What it means | How to fix it |
| --- | --- | --- |
| `Port 5173 is in use` | Another program (often an old copy of this site) is already using that port. | Press **Ctrl + C** in the other terminal to stop it. Or start on a different port: `npm run dev -- --port 5174`. |
| `'npm' is not recognized` | Node.js is not installed, or the terminal does not know where it is. | Install Node.js from <https://nodejs.org> (LTS), restart your computer, then check with `node -v`. |
| `Unsupported engine` / strange errors after install | You are on an old Node version. | Run `node -v`. If it is below **20**, install the newest LTS from <https://nodejs.org>. |
| The page is completely blank / white | The site hit a JavaScript error. | Press **F12** in the browser → open the **Console** tab → read the red message. Then run `npm run lint` to find the mistake. |
| Images do not show | The file name or folder is wrong. | Check the picture really exists in `public/img/...` and that the path in `src/data/*.ts` starts with `/img/...`. File names are **case-sensitive**. |
| My changes do not appear | The browser kept an old copy. | Press **Ctrl + Shift + R** (hard refresh). If that fails, stop the server (**Ctrl + C**) and run `npm run dev` again. |
| `EACCES` / permission errors | Your user cannot write to the folder. | Move the project to your own Documents folder (avoid `C:\Program Files`). On Windows, do not run the terminal as Administrator. |
| `npm install` fails with network errors | Your internet or company proxy blocked it. | Check your connection, then try again. If you are on a work/school network, try a phone hotspot. |
| Weird errors that make no sense | Old half-downloaded files. | Delete the `node_modules` folder and the `package-lock.json` file, then run `npm install` again. |

---

## 5. Where to edit your own content

Every piece of text on the website is **dummy Lorem ipsum** — except your name.
You can safely replace anything you like. Look for the banner comments that start with **✏️** in each file.

> ⚠️ **Important:** the line numbers below were correct when this file was written.
> As soon as you add or remove lines, they will move. **Always search for the quoted anchor text** instead of trusting the number.

| What to change | File | What to look for (anchor) | Line (approx.) |
| --- | --- | --- | --- |
| Your name | `src/config/Identity.ts` | `export const OWNER_NAME = "Maurel Chairinniswah Yasmine";` | 9 |
| Your job title / role | `src/config/Identity.ts` | `export const JOB_TITLE = ...` | 15 |
| Your one-line headline | `src/config/Identity.ts` | `export const HEADLINE = ...` | 18 |
| Your email | `src/config/Identity.ts` | `export const CONTACT_EMAIL = "maurel@example.com";` | 21 |
| Your WhatsApp number | `src/config/Identity.ts` | `export const WHATSAPP_NUMBER = "6281234567890";` (digits only, no `+`) | 27 |
| Your LinkedIn / GitHub / Instagram | `src/config/Identity.ts` | `export const SOCIAL_LINKS = { ... }` — replace every `REPLACE_ME` | 33 |
| Your resume files | `src/config/Identity.ts` | `export const RESUME = { en: ..., id: ... }` | 41 |
| Your photo | `src/config/Identity.ts` | `export const PORTRAIT_IMAGE = "/img/portrait.png";` | 47 |
| Your cover banner (linktree page) | `src/config/Identity.ts` | `export const COVER_IMAGE = "/img/cover.png";` | 50 |
| Your projects / dashboards | `src/data/projects.ts` | banner **✏️ EDIT YOUR PROJECTS HERE**, then `export const Projects` | 53 |
| The project filter buttons | `src/data/projects.ts` | `export const ProjectCategories` | 147 |
| Your skills | `src/data/skills.ts` | banner **✏️ EDIT YOUR SKILLS HERE**, then `export const SkillCategories` | 43 |
| The skill hint text | `src/data/skills.ts` | `export const SKILLS_HINT = ...` | 87 |
| Your certificates | `src/data/certificate.ts` | banner **✏️ EDIT YOUR CERTIFICATES HERE**, then `export const Certificates` | 18 |
| Your social links list | `src/data/social.ts` | `export const Socials` | 24 |
| Your story / timeline / counters | `src/data/career.ts` | `CareerTimeline`, `EXPERIENCE_PARAGRAPH`, `ANALYTICS_SNAPSHOT`, `HERO_STATS` | 17 / 45 / 49 / 66 |
| Your photos & screenshots | `public/img/...` | replace `portrait.png`, `cover.png`, `projects/dummy-*.png`, `certificate/dummy-*.png` | — |
| Your resume PDFs | `public/pdf/...` | `resume-en.pdf`, `resume-id.pdf` | — |
| The theme colours | `src/index.css` | `@theme { ... }` | 13 |
| The available icons | `src/data/icons.tsx` | banner **➕ HOW TO ADD A NEW ICON** | 7 |

### The ✏️ banners

Each content file starts with a big comment banner so you can find it instantly:

```ts
// ============================================================
// ✏️ EDIT YOUR PROJECTS HERE — replace the dummy text below
// ============================================================
```

Search for `✏️` in VS Code (**Ctrl + Shift + F**) to jump between them.

---

## 6. How to add your Tableau & Power BI projects

This is the part you will use the most. Everything happens in **`src/data/projects.ts`**.

### Step 1 — Save a screenshot of your dashboard

1. Open your dashboard in Tableau Public or Power BI.
2. Take a screenshot of the whole dashboard.
3. Save the picture into the folder **`public/img/projects/`**.
   Give it a simple name with no spaces, for example: **`my-sales-dashboard.png`**

### Step 2 — Add the project to the list

Open `src/data/projects.ts`. You will see a list of example projects.
**Copy one block** (from `{` to `},`) and paste it at the end of the list, then change the text:

```ts
{
  title: "Indonesia Sales Performance Dashboard",
  category: "Dashboards",
  description:
    "This dashboard answers the question: which regions drive the most revenue? " +
    "The data comes from a public retail dataset with 3 years of transactions. " +
    "I cleaned the data in SQL, then built the visuals in Tableau. " +
    "The biggest insight was that two regions produced more than half of total sales.",
  urlDirect: "https://public.tableau.com/app/profile/YOUR_NAME/viz/YOUR_WORKBOOK/Overview",
  linkText: "View Dashboard",
  srcImage: "/img/projects/my-sales-dashboard.png",
  tags: ["Sales", "KPI", "Regional"],
  icons: [
    { SvgIcon: Tableau, title: "Tableau" },
    { SvgIcon: Sql, title: "SQL" },
  ],
},
```

### Step 3 — Understand each line

| Line | What it does | Example |
| --- | --- | --- |
| `title` | The project name shown on the card. | `"Sales Dashboard"` |
| `category` | Must be one of: `"Dashboards"`, `"Data Visualization"`, `"Business Intelligence"`, `"Data Cleaning"`. This powers the filter buttons. | `"Dashboards"` |
| `description` | **2–4 sentences**: the business question, where the data came from, and the insight you found. Write the full text here — the card shortens it automatically and the pop-up shows everything. | see above |
| `urlDirect` | The link that opens when someone clicks the button. | Tableau Public or Power BI link |
| `linkText` | The button label. Use `"View Dashboard"` or `"View Report"`. | `"View Dashboard"` |
| `srcImage` | The screenshot path. It must start with `/img/projects/`. | `"/img/projects/my-sales-dashboard.png"` |
| `tags` | Small pills shown on the card. 2–4 short words. | `["Sales", "KPI"]` |
| `icons` | The tool icons shown on the card. | `[{ SvgIcon: Tableau, title: "Tableau" }]` |

### Where do I get the links?

- **Tableau Public** — publish your workbook, open it in the browser, and copy the address. It looks like
  `https://public.tableau.com/app/profile/<your-name>/viz/<WorkbookName>/<ViewName>`
- **Power BI "Publish to web"** — in Power BI, open your report → **File → Embed report → Publish to web (public)** → copy the link it gives you (it starts with `https://app.powerbi.com/view?r=...`).

### How many projects can I have?

As many as you want. The home page shows the **first 4**; the `/projects` page shows **all** of them.
The number badges update automatically.

### Changing which tools appear on a card

The `icons` line uses the ready-made icon components from `src/data/icons.tsx`:

```ts
icons: [
  { SvgIcon: Tableau, title: "Tableau" },
  { SvgIcon: PowerBi, title: "Power BI" },
  { SvgIcon: Python, title: "Python" },
],
```

Available out of the box: `Sql`, `Python`, `RLanguage`, `Javascript`, `Tableau`, `PowerBi`, `LookerStudio`,
`Excel`, `GoogleSheets`, `Postgresql`, `Mysql`, `BigQuery`, `Pandas`, `Numpy`, `Jupyter`, `Git`, `Github`,
`Figma`, `Vscode`, `GoogleWorkspace`, `GoogleCloud`.

Need another one (Docker, Airflow, Canva…)? Open `src/data/icons.tsx` and follow the banner
**➕ HOW TO ADD A NEW ICON** — it is a 4-step copy-paste.

---

### Optional advanced: embed a LIVE Tableau or Power BI report

> 🧑‍🔬 This part is optional. Skip it if you are happy with screenshots and links.

Instead of only linking out, you can show the real, interactive dashboard inside the pop-up.

**1. Create a new file:** `src/components/TableauEmbed.tsx`

```tsx
interface TableauEmbedProps {
  /** The Tableau Public view URL. */
  url: string;
  /** Height of the frame in pixels. */
  height?: number;
}

/** Shows a live, interactive Tableau dashboard inside an iframe. */
export function TableauEmbed({ url, height = 600 }: TableauEmbedProps) {
  return (
    <iframe
      src={url}
      title="Embedded dashboard"
      width="100%"
      height={height}
      frameBorder="0"
      loading="lazy"
      className="rounded-2xl border border-border-soft"
    />
  );
}
```

**2. Use it inside the project pop-up.**
Open `src/modules/home/components/project-component.tsx`, find the line that shows the image:

```tsx
<img src={project.srcImage} alt={project.title} className="aspect-video w-full object-cover" />
```

…and add the embed right below it:

```tsx
{project.urlDirect?.includes("public.tableau.com") && (
  <TableauEmbed
    url={`${project.urlDirect}?:showVizHome=no&:embed=true`}
    height={600}
  />
)}
```

**3. For Power BI**, paste the iframe code that Power BI gives you
(**File → Embed report → Publish to web**). It looks like this:

```tsx
<iframe
  title="Power BI report"
  src="https://app.powerbi.com/view?r=YOUR_EMBED_CODE"
  width="100%"
  height="600"
  frameBorder="0"
  allowFullScreen
/>
```

> ℹ️ Embedded dashboards need an internet connection, and they are heavier than a screenshot.
> A good pattern is: screenshot on the card, live embed inside the pop-up.

---

## 7. How to change the pastel colours

**All the colours live in one place:** the `@theme` block at the top of **`src/index.css`** (around line 13).

```css
@theme {
  --color-blush: #f7d9e3;        /* soft pink — main accent wash */
  --color-rose: #e8a0b4;         /* pink — buttons and highlights */
  --color-rose-deep: #c97a93;    /* deeper pink — links, active states */
  --color-beige: #f5efe6;        /* warm neutral card tint */
  --color-lavender: #e6e0f8;     /* soft purple — secondary accent */
  --color-lilac: #c9beea;        /* deeper purple — gradients */
  --color-cream: #fffbf7;        /* page background (light mode) */
  --color-ink: #4a3f4b;          /* main text — soft plum, never pure black */
  --color-ink-muted: #8a7c8e;    /* secondary text */
  --color-border-soft: #eadfe8;  /* all borders */
}
```

Change a value here and **the whole website re-tints itself** — cards, buttons, tooltips, glows, everything.

**Rules of thumb:**

- Keep colours **light and soft**. The design avoids pure black (`#000`) and harsh shadows on purpose.
- If you change `--color-ink`, pick a dark colour with a little warmth (plum, brown, navy) rather than pure black.
- To re-tint the dark mode, scroll down to the `.dark { ... }` block (around line 143) and change `--bg-base`, `--text-base` and `--accent` there.

**Handy colour tools:** <https://coolors.co> or <https://uicolors.app> — paste a hex code and it suggests matching shades.

---

## 8. How to change your name / branding everywhere at once

The website is **config-driven**. Your identity is written **once**, in
**`src/config/Identity.ts`**, and every part of the site reads from it:

- the hero headline
- the About section caption
- the footer copyright line
- the `<title>` of every page and the social preview description
- the linktree page
- your email, WhatsApp and social links

So: **change `OWNER_NAME` in `src/config/Identity.ts` and it updates everywhere.**
Never type your name directly into a component — if you do, some places will update and others will not.

The same idea applies to content:

```
src/config/Identity.ts   → who you are (name, role, email, socials, photos)
src/data/*.ts            → what you have done (projects, skills, certificates)
```

---

## 9. Put it online for free (deploy)

### Option A — Vercel (recommended)

1. Push this project to GitHub (create a free account at <https://github.com>).
2. Go to <https://vercel.com> and sign in with GitHub.
3. Click **Add New → Project**, pick your repository, and click **Deploy**.
4. Vercel detects Vite automatically. If it asks, use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Wait ~1 minute. Your site is live on a `*.vercel.app` address.

### Option B — Netlify

1. Go to <https://netlify.com> and sign in with GitHub.
2. **Add new site → Import an existing project**, pick your repository.
3. Use:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**.

### About `vercel.json`

This project includes a file called `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Why you need it:** this is a *single-page app*. All pages are handled by JavaScript.
Without this rule, opening `yoursite.com/projects` directly (or refreshing the page there) would show
"404 Not Found". The rule tells the host: *"for any address, send the visitor `index.html` and let the app sort it out."*
Netlify users: create a file `public/_redirects` containing `/* /index.html 200`.

### Set your real domain (important for sharing previews)

The site already defaults to **`https://portofolio-maurel.vercel.app`** for canonical links,
Open Graph URLs, `sitemap.xml` and `robots.txt` (see `DEFAULT_SITE_URL` in `src/config/AppConfig.ts`).

You only need this step if the site moves to a different domain:

1. Copy `.env.example` to a new file called `.env`.
2. Fill in your domain:

```env
VITE_DOMAIN=https://portofolio-maurel.vercel.app
```

3. Redeploy. Now the canonical links, `sitemap.xml` and social preview images point to the right place.

---

## 10. What every folder does

```
web-maurel/
├─ index.html                  The single HTML page. The <head> is filled in automatically.
├─ vite.config.ts              Build settings (Tailwind, React, page routing, @ alias).
├─ vite-plugin-head.ts         Injects SEO tags, sitemap.xml and robots.txt at build time.
├─ vercel.json                 Makes /projects, /about… work when opened directly.
├─ .env.example                Template for VITE_DOMAIN.
├─ eslint.config.js            Code-quality rules.
├─ scripts/
│  └─ generate-placeholders.mjs  Creates the dummy images and PDFs. Run with: node scripts/generate-placeholders.mjs
│
├─ public/                     Files served exactly as they are (not processed).
│  ├─ img/portrait.png         Your photo.
│  ├─ img/cover.png            Linktree banner.
│  ├─ img/projects/            Your dashboard screenshots.
│  ├─ img/certificate/         Your certificate images.
│  ├─ pdf/                     Your resume PDFs.
│  ├─ lottie/skills.json       The little animation in the skills section.
│  └─ favicon.svg              The small icon in the browser tab.
│
└─ src/
   ├─ main.tsx                 Start of the app: mounts React and loads the CSS.
   ├─ App.tsx                  Router + providers + layout.
   ├─ index.css                🎨 THEME: colours, dark mode, fonts, animations.
   ├─ App.css                  Small utility classes (.count-badge, .loader, surfaces…).
   │
   ├─ pages/                   ⚠️ Route files. Keep these THIN (they only glue things together).
   │  ├─ index.tsx             → /
   │  ├─ projects.tsx          → /projects
   │  ├─ certification.tsx     → /certification
   │  ├─ about.tsx             → /about
   │  ├─ linktree.tsx          → /linktree
   │  ├─ contact.tsx           → /contact
   │  └─ [...all].tsx          → any unknown address (the styled 404 page)
   │
   ├─ modules/                 🧩 The real UI lives here, one folder per page.
   │  ├─ home/
   │  │  ├─ index.tsx          Stacks all home sections in order.
   │  │  ├─ section/           hero, scroll-showcase, recent-projects, about, skills, certification
   │  │  └─ components/        project-component, skill-icon, certificate-component, analytics-snapshot
   │  ├─ project/              The /projects grid + pop-up.
   │  ├─ certificate/          The /certification grid.
   │  ├─ about/                The /about page content.
   │  ├─ linktree/             The /linktree page content.
   │  └─ contact/              The /contact form and side cards.
   │
   ├─ components/              🔁 Shared building blocks (navbar, footer, blobs, counters…).
   ├─ layouts/MainLayout.tsx   The page shell: navbar + content + footer.
   ├─ context/                 App-wide state (theme, screen size, welcome splash).
   ├─ config/                  ⚙️ Identity, SEO metadata, site config.
   │  ├─ Identity.ts           ✏️ YOUR NAME, ROLE, EMAIL, SOCIALS, PHOTOS.
   │  ├─ Metadata.ts           Title/description per page.
   │  ├─ Head.ts               Builds the SEO tags, sitemap and robots file.
   │  └─ AppConfig.ts          Small global settings.
   └─ data/                    📦 YOUR CONTENT.
      ├─ projects.ts           ✏️ Your dashboards and reports.
      ├─ skills.ts             ✏️ Your tools.
      ├─ certificate.ts        ✏️ Your certificates.
      ├─ career.ts             ✏️ Your story, timeline and numbers.
      ├─ social.ts             Your social links list.
      └─ icons.tsx             The icon library (+ how to add more).
```

**The golden rule of this project:**

```
pages/ (thin)  →  modules/ (the UI)  →  components/ (shared pieces)
                          ↓
                  config/ + data/ (your content)
```

When you want to change *words or links*, edit `config/` or `data/`.
When you want to change *how something looks*, edit `modules/` or `components/`.

---

## 11. FAQ, licence and credits

### FAQ

**Do I need to know how to code?**
No. To make this site yours, you only edit text between quotation marks in the `config/` and `data/` files.

**Is there a backend or a database?**
No. The site is 100% frontend. The contact form shows a success message but does not send anything anywhere.
If you want real messages, connect a free service like Formspree, or simply keep the email/WhatsApp buttons.

**Are the numbers real?**
No — every number, chart and calendar square is **hardcoded dummy data**. Edit them in `src/data/career.ts`.

**How do I add a new page?**
Create a file in `src/pages/`, for example `src/pages/blog.tsx`, and export a default component:

```tsx
import { HelmetContainer } from "@/components/HelmetContainer";

export default function BlogPage() {
  return (
    <>
      <HelmetContainer page="/about" />
      <h1>My blog</h1>
    </>
  );
}
```

The address `/blog` now works automatically — no routing file to edit.

**Can I use my own photos?**
Yes. Replace the files in `public/img/`. Keep the same file names and you do not have to change any code.

**How do I update the numbers in the hero counters?**
Open `src/data/career.ts` and edit `HERO_STATS`.

**How do I remove a section from the home page?**
Open `src/modules/home/index.tsx` and delete the line for that section, for example `<Skills />`.

**Does dark mode work everywhere?**
Yes. Every component is styled for both themes. Try the toggle in the bottom navigation.

**Why does my name use letters with odd spacing in the hero?**
Each letter animates in separately, which is why it looks like that. It is intentional and purely visual.

### Licence

This project is released under the **MIT Licence** — you may use, change and publish it freely, including for
commercial work. See <https://opensource.org/licenses/MIT> for the full text.

You are welcome to replace everything inside it with your own content.

### Credits

- Built with [React](https://react.dev), [Vite](https://vite.dev) and [Tailwind CSS](https://tailwindcss.com).
- Animations by [Framer Motion](https://motion.dev) and [GSAP](https://gsap.com).
- Icons by [React Icons](https://react-icons.github.io/react-icons) (Tabler, Simple Icons, Font Awesome, Flat Color Icons).
- Fonts: **Fraunces** and **Inter** via [Google Fonts](https://fonts.google.com).
- Charts by [Chart.js](https://www.chartjs.org) and [react-chartjs-2](https://react-chartjs-2.js.org).
- Wave background by [ogl](https://github.com/oframe/ogl); the small illustration by [lottie-web](https://airbnb.io/lottie/).

---

<p align="center">Made with 💗 for <strong>Maurel Chairinniswah Yasmine</strong></p>
