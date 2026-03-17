"use client";

import { motion } from "framer-motion";
import { BookOpen, Languages, ScrollText } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";

type Theme = "default" | "hommes" | "femmes" | "enfants";

type CourseCardProps = {
  level: string;
  levelAr: string;
  description: string;
  duration: string;
  theme?: Theme;
};

const themeStyles: Record<Theme, string> = {
  default: "from-[#f8f2e2] to-[#e8d5b0] border-[#d4af3770] text-[var(--encre-noire)]",
  hommes: "from-[#2c1507] to-[#8b5e3c] border-[#c17f24aa] text-[#f5e6c8]",
  femmes: "from-[#f7efe3] to-[#e8c4a0] border-[#a67c5290] text-[#3f2a1f]",
  enfants: "from-[#0f2a63] to-[#1a3a6b] border-[#4ecdc499] text-[#fff8dc]",
};

const icons = [BookOpen, Languages, ScrollText, BookOpen];

export default function CourseCard({
  level,
  levelAr,
  description,
  duration,
  theme = "default",
}: CourseCardProps) {
  const Icon = icons[(level.length + description.length) % icons.length];
  const isMobile = useMobile(768);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
      className={`card-hover w-full rounded-2xl border bg-gradient-to-br p-5 ${themeStyles[theme]} ${isMobile ? "active:scale-[0.98]" : ""}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-arabic text-3xl leading-none">{levelAr}</p>
          <h3 className="mt-2 font-display text-2xl">{level}</h3>
        </div>
        <span className="rounded-full border border-current/30 p-2">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="text-sm leading-relaxed opacity-90">{description}</p>
      <p className="mt-4 text-xs tracking-[0.2em] uppercase opacity-80">{duration}</p>
    </motion.article>
  );
}
