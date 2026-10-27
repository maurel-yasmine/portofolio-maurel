import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/AppConfig";
import { JOB_TITLE, OWNER_NAME } from "@/config/Identity";

interface WelcomeProviderProps {
  children: ReactNode;
}

const NAME_LETTERS = OWNER_NAME.split("");

/**
 * Shows a soft pastel welcome splash the first time someone opens the
 * site in a browsing session. Repeat visits inside the same session skip it.
 */
export function WelcomeProvider({ children }: WelcomeProviderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem(APP_CONFIG.welcomeStorageKey);
    if (!alreadySeen) {
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(APP_CONFIG.welcomeStorageKey, "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, 3200);
    return () => window.clearTimeout(timer);
  }, [visible, dismiss]);

  return (
    <>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-gradient-to-br from-cream via-blush/70 to-lavender/70 dark:from-[#1a1418] dark:via-[#2a1f28] dark:to-[#221a2c]"
            onClick={dismiss}
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-4 flex max-w-md flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/70 text-3xl font-heading font-bold text-rose-deep shadow-[0_20px_60px_-20px_rgba(201,190,234,0.45)] backdrop-blur-md dark:bg-white/10 dark:text-rose"
              >
                M
              </motion.div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-ink-muted">
                Welcome
              </p>

              <h1 className="font-heading text-2xl leading-snug tracking-tight text-ink tiny:text-3xl sm:text-4xl dark:text-[#f3eaf0]">
                {NAME_LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.02, duration: 0.35 }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-4 text-sm font-light leading-relaxed text-ink-muted"
              >
                {JOB_TITLE}
              </motion.p>

              <motion.button
                type="button"
                onClick={dismiss}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="mt-8 rounded-full border border-border-soft bg-white/70 px-6 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted transition hover:-translate-y-0.5 hover:text-rose-deep dark:bg-white/10"
              >
                Enter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
