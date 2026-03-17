"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Programme } from "@/data/programmes";

type ProgrammeAccordionProps = {
  programme: Programme;
  theme?: "default" | "hommes" | "femmes" | "enfants";
  index?: number;
};

const themeStyles: Record<
  NonNullable<ProgrammeAccordionProps["theme"]>,
  { accent: string; bullet: string }
> = {
  default: { accent: "var(--or-luxe)", bullet: "var(--or-brillant)" },
  hommes: { accent: "var(--desert-ambre)", bullet: "var(--desert-ambre)" },
  femmes: { accent: "var(--andalou-bordeaux)", bullet: "var(--andalou-brique)" },
  enfants: { accent: "var(--magie-or)", bullet: "var(--magie-turquoise)" },
};

export default function ProgrammeAccordion({
  programme,
  theme = "default",
  index = 0,
}: ProgrammeAccordionProps) {
  const [open, setOpen] = useState(false);
  const styles = themeStyles[theme];
  const bgAlternate = index % 2 === 0 ? "var(--blanc-ivoire)" : "var(--beige-creme)";

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--or-brillant)]/30"
      style={{ backgroundColor: bgAlternate }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-opacity hover:opacity-90"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="font-arabic text-lg text-[var(--encre-douce)]">{programme.levelAr}</p>
          <h3 className="mt-1 font-display text-2xl text-[var(--encre-noire)]">{programme.title}</h3>
          <span
            className="mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
            style={{ backgroundColor: styles.accent, color: "var(--blanc-ivoire)" }}
          >
            {programme.level}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: styles.accent }}
        >
          <ChevronDown className="h-6 w-6 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--or-brillant)]/20 px-5 pb-6 pt-2">
              <p className="text-sm leading-relaxed text-[var(--encre-douce)]">
                {programme.description}
              </p>
              <ul className="mt-4 space-y-2">
                {programme.objectifs.map((obj) => (
                  <li
                    key={obj}
                    className="flex items-start gap-2 text-sm text-[var(--encre-douce)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: styles.bullet }}
                    />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: `${styles.accent}20`, color: styles.accent }}
                >
                  Durée : {programme.duration}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: `${styles.accent}20`, color: styles.accent }}
                >
                  Prérequis : {programme.prerequis}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
