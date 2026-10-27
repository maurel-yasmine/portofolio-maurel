import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/AppConfig";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/** Subtle fade + slide wrapper applied to every route. */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: APP_CONFIG.transitionDuration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
