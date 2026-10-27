import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface InitialMotionProps {
  children: ReactNode;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** How far (in px) the element travels upwards. */
  y?: number;
  className?: string;
}

/** Gentle fade + rise animation that plays once, when scrolled into view. */
export function InitialMotion({ children, delay = 0, y = 22, className = "" }: InitialMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
