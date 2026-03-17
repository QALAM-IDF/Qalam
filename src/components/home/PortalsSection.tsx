"use client";

import { motion } from "framer-motion";
import PortalCard from "@/components/ui/PortalCard";

const portals = [
  {
    title_ar: "للرجال",
    title_fr: "Cours Hommes",
    description:
      "Desert vivant, horizon nocturne et progression exigeante pour forger une maitrise solide.",
    href: "/hommes",
    theme: "hommes" as const,
  },
  {
    title_ar: "للنساء",
    title_fr: "Cours Femmes",
    description:
      "Jardins andalous, ambiance raffinee et cadre exclusif pour apprendre en serenite.",
    href: "/femmes",
    theme: "femmes" as const,
  },
  {
    title_ar: "للأطفال",
    title_fr: "Cours Enfants",
    description:
      "Nuit des 1001 nuits, etoiles et recits pour transformer chaque lecon en aventure.",
    href: "/enfants",
    theme: "enfants" as const,
  },
];

export default function PortalsSection() {
  return (
    <section id="portails" className="grain-surface bg-[var(--beige-creme)] py-16 md:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <p className="font-arabic text-4xl text-[var(--or-luxe)]">ثلاثة عوالم</p>
          <h2 className="font-display text-5xl text-[var(--encre-noire)]">Choisis ton portail</h2>
        </motion.div>
        <div className="flex flex-col gap-2 md:flex md:flex-row md:h-[70vh] md:gap-4">
          {portals.map((portal) => (
            <motion.div
              key={portal.href}
              className="md:flex-1 md:transition-all md:duration-300 md:hover:flex-[1.4]"
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            >
              <PortalCard {...portal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
