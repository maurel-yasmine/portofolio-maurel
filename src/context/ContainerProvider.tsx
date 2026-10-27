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
 * Tracks viewport size (for animation decisions) and renders the very first
 * cream-coloured splash that fades out once the app has painted.
 */
export function ContainerProvider({ children }: ContainerProviderProps) {
  const [fullPathName, setFullPathName] = useState<string>(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const [isTiny, setIsTiny] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashVisible(false), 480);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<ContainerContextValue>(
    () => ({ fullPathName, setFullPathName, isTiny, isMobile }),
    [fullPathName, isTiny, isMobile],
  );

  return (
    <ContainerContext.Provider value={value}>
      {children}

      {/* Initial cream splash — fades away on first paint. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[100] bg-cream transition-opacity duration-700 ease-out dark:bg-[#1a1418] ${
          splashVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </ContainerContext.Provider>
  );
}

export function useContainer(): ContainerContextValue {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used inside <ContainerProvider>.");
  }
  return context;
}
