import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Close, Folder, Heart, Home, Menu, Moon, Sun, User } from "@/data/icons";
import type { IconComponent } from "@/data/icons";

interface NavItem {
  to: string;
  label: string;
  SvgIcon: IconComponent;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", SvgIcon: Home },
  { to: "/projects", label: "Projects", SvgIcon: Folder },
  { to: "/about", label: "About", SvgIcon: User },
  { to: "/contact", label: "Contact", SvgIcon: Heart },
];

/** Home-page section ids mapped to the nav item they should highlight. */
const SECTION_TO_PATH: Record<string, string> = {
  home: "/",
  projects: "/projects",
  about: "/about",
  // Tech Stack sits between About and Contact and belongs to the "About" area.
  skills: "/about",
  contact: "/contact",
};

function isActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

/**
 * ScrollSpy: watches the home page sections and reports which nav item the
 * viewport is currently in, so the dock highlight follows scrolling.
 *
 * Only runs on the home route — the other pages have no sections to watch.
 */
function useScrollSpy(enabled: boolean, pathname: string): string | null {
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActivePath(null);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let attempts = 0;
    let timer = 0;

    const setup = () => {
      const targets: { element: HTMLElement; path: string }[] = [];

      Object.entries(SECTION_TO_PATH).forEach(([id, path]) => {
        const element = document.getElementById(id);
        if (element) targets.push({ element, path });
      });

      if (targets.length === 0) {
        if (attempts < 20) {
          attempts += 1;
          timer = window.setTimeout(setup, 100);
        }
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible) {
            const match = targets.find((target) => target.element === visible.target);
            if (match) setActivePath(match.path);
            return;
          }

          // Nothing sits in the detection band (a gap between sections).
          // Fall back to the nearest section whose top has passed the band,
          // so the highlight never gets stuck on a section far above.
          const bandTop = window.innerHeight * 0.45;
          let nearestPath: string | null = null;
          let nearestDistance = Number.POSITIVE_INFINITY;

          targets.forEach((target) => {
            const rect = target.element.getBoundingClientRect();
            if (rect.top <= bandTop) {
              const distance = bandTop - rect.top;
              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestPath = target.path;
              }
            }
          });

          if (nearestPath) setActivePath(nearestPath);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] },
      );

      targets.forEach((target) => observer?.observe(target.element));
    };

    setup();

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [enabled, pathname]);

  return activePath;
}

/** Applies the circular clip-path origin, then runs the theme change. */
function useCircleReveal() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const rect = event.currentTarget.getBoundingClientRect();
      root.style.setProperty("--toggle-x", `${rect.left + rect.width / 2}px`);
      root.style.setProperty("--toggle-y", `${rect.top + rect.height / 2}px`);

      if (typeof document.startViewTransition === "function") {
        document.startViewTransition(() => {
          setTheme(next);
        });
        return;
      }

      setTheme(next);
    },
    [resolvedTheme, setTheme],
  );

  return { isDark: resolvedTheme === "dark", mounted, toggleTheme };
}

/** Floating bottom navigation + theme toggle. */
export function Navbar() {
  const location = useLocation();
  const { isDark, mounted, toggleTheme } = useCircleReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const spyPath = useScrollSpy(location.pathname === "/", location.pathname);

  const activePath = spyPath ?? location.pathname;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Compact menu trigger for very small screens (opens a small sheet) */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="glass-pill flex h-10 w-10 items-center justify-center text-lg text-ink transition hover:text-rose-deep dark:text-[#f3eaf0]"
        >
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Mobile navigation"
            className="panel-soft fixed left-4 top-16 z-50 w-52 p-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(activePath, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-blush/40 text-rose-deep dark:bg-rose/10 dark:text-rose"
                      : "text-ink-muted hover:bg-blush/20 hover:text-rose-deep dark:hover:bg-white/5"
                  }`}
                >
                  <item.SvgIcon className="text-lg" />
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main floating bottom navigation */}
      <nav
        aria-label="Main navigation"
        className="glass-pill fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 px-2 py-2 tiny:gap-1.5"
      >
        <ul className="flex items-center gap-0.5 tiny:gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(activePath, item.to);
            return (
              <li key={item.to} className="group relative">
                <Link
                  to={item.to}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors duration-300 ${
                    active
                      ? "text-rose-deep dark:text-rose"
                      : "text-ink-muted hover:text-rose-deep dark:hover:text-rose"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-blush/60 dark:bg-rose/15"
                    />
                  )}
                  <item.SvgIcon />
                </Link>

                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-soft bg-white/90 px-3 py-1 text-[11px] font-medium text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(232,160,180,0.35)] transition-opacity duration-200 group-hover:opacity-100 dark:bg-[#241c22]/95 dark:text-[#f3eaf0]"
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>

        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border-soft dark:bg-[#33262e]" />

        {/* Theme toggle with tooltip + circle reveal */}
        <div className="group relative">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-muted transition hover:rotate-12 hover:text-rose-deep dark:hover:text-rose"
          >
            {mounted && isDark ? <Sun /> : <Moon />}
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-soft bg-white/90 px-3 py-1 text-[11px] font-medium text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(232,160,180,0.35)] transition-opacity duration-200 group-hover:opacity-100 dark:bg-[#241c22]/95 dark:text-[#f3eaf0]"
          >
            {mounted && isDark ? "Light mode" : "Dark mode"}
          </span>
        </div>
      </nav>
    </>
  );
}
