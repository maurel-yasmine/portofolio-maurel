import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/AppConfig";

interface ContainerContextValue {
  /** Current route path, kept in sync by the layout. */
  fullPathName: string;
  setFullPathName: (path: string) => void;
  /** true when the viewport is narrower than the `tiny` breakpoint (350px). */
  isTiny: boolean;
  /** true when the viewport is narrower than the `md` breakpoint (768px). */
  isMobile: boolean;
}

const ContainerContext = createContext<ContainerContextValue | null>(null);

interface ContainerProviderProps {
  children: ReactNode;
}

/**
 * Tracks viewport size for the animation logic used across the site.
 *
 * There is no landing/splash overlay: the page renders immediately so the
 * portfolio is visible on first paint.
 */
export function ContainerProvider({ children }: ContainerProviderProps) {
  const [fullPathName, setFullPathName] = useState<string>(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const [isTiny, setIsTiny] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      setIsTiny(width < APP_CONFIG.tinyBreakpoint);
      setIsMobile(width < APP_CONFIG.mobileBreakpoint);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const value = useMemo<ContainerContextValue>(
    () => ({ fullPathName, setFullPathName, isTiny, isMobile }),
    [fullPathName, isTiny, isMobile],
  );

  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
}

export function useContainer(): ContainerContextValue {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used inside <ContainerProvider>.");
  }
  return context;
}
