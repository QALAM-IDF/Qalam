"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const missionText = {
  p1:
    "Qalam — la plume en arabe — est né d'une conviction simple : la langue arabe mérite un enseignement aussi soigné que la calligraphie qui l'exprime. Fondée en 2022, notre école propose un cadre d'apprentissage structuré, bienveillant et ancré dans la tradition.",
  p2:
    "Nous avons fait le choix d'univers séparés — hommes, femmes, enfants — pour que chaque élève évolue dans un cadre adapté à ses besoins, sa pudeur et son rythme d'apprentissage.",
  p3:
    "Tous nos professeurs sont natifs, diplômés et passionnés. Certains sont hafiz du Coran, d'autres spécialistes de la grammaire classique. Leur mission commune : vous transmettre l'arabe avec rigueur et amour.",
};

export default function MissionBlock() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-12 lg:grid-cols-[55%_45%] lg:items-start"
    >
      <div>
        <p
          className="font-arabic text-5xl md:text-6xl font-medium opacity-15"
          style={{ color: "var(--or-luxe)" }}
          aria-hidden
        >
          قِصَّتُنَا
        </p>
        <h2
          className="font-display text-4xl font-semibold mt-2"
          style={{ color: "var(--encre-noire)" }}
        >
          Notre Mission
        </h2>
        <p className="mt-6 font-body text-lg leading-relaxed" style={{ color: "var(--encre-douce)" }}>
          {missionText.p1}
        </p>
        <p className="mt-4 font-body text-lg leading-relaxed" style={{ color: "var(--encre-douce)" }}>
          {missionText.p2}
        </p>
        <p className="mt-4 font-body text-lg leading-relaxed" style={{ color: "var(--encre-douce)" }}>
          {missionText.p3}
        </p>
        <CalligraphyDivider className="mt-8 w-48" color="var(--or-brillant)" compact />
      </div>

      <div className="relative flex flex-col gap-6">
        <ArabicPattern
          className="pointer-events-none absolute -inset-4 opacity-20"
          color="var(--or-luxe)"
          animate
        />
        <div
          className="relative rounded-2xl border-2 p-6"
          style={{
            backgroundColor: "var(--blanc-ivoire)",
            borderColor: "var(--or-brillant)",
          }}
        >
          <p className="font-arabic text-2xl" style={{ color: "var(--or-luxe)" }}>
            قلم
          </p>
          <p className="font-display text-xl font-semibold mt-1" style={{ color: "var(--encre-noire)" }}>
            Fondé en 2022
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--encre-douce)" }}>
            École de langue arabe en ligne
          </p>
        </div>
        <div
          className="relative flex items-center gap-4 rounded-2xl border-2 p-6"
          style={{
            backgroundColor: "var(--blanc-ivoire)",
            borderColor: "var(--or-brillant)",
          }}
        >
          <Globe className="h-10 w-10 shrink-0" style={{ color: "var(--or-luxe)" }} />
          <div>
            <p className="font-display text-lg font-semibold" style={{ color: "var(--encre-noire)" }}>
              100% en ligne
            </p>
            <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
              Cours par Zoom, replay illimité
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
