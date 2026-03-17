"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, CalendarDays, BookCheck } from "lucide-react";
import StatsBar from "@/components/home/StatsBar";

const points = [
  {
    icon: GraduationCap,
    text: "Professeurs natifs certifies",
  },
  {
    icon: Users,
    text: "Cours en groupe (max 8) et particuliers",
  },
  {
    icon: CalendarDays,
    text: "Forfaits 30h flexibles: Zoom + plateforme",
  },
  {
    icon: BookCheck,
    text: "Tous niveaux: debutant a coranique/tajwid",
  },
];

export default function WhyUs() {
  return (
    <section className="grain-surface bg-[var(--beige-chaud)] py-16 md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-5">
        <div className="relative lg:col-span-3">
          <p className="pointer-events-none absolute -top-8 left-0 font-arabic text-7xl text-[var(--or-luxe)]/20 md:text-9xl">
            لماذا نحن؟
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative font-display text-5xl text-[var(--encre-noire)]"
          >
            Pourquoi nous ?
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.article
                  key={point.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="card-hover rounded-2xl border border-[#d4af3770] bg-[var(--blanc-ivoire)] p-4"
                >
                  <Icon className="h-5 w-5 text-[var(--or-luxe)]" />
                  <p className="mt-2 text-sm text-[var(--encre-douce)]">{point.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-2">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
