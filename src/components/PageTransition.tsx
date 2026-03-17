"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMobile(768);

  const variants = {
    initial: {
      opacity: 0,
      scale: isMobile ? 1 : 1.03,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: isMobile ? 1 : 0.97,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
