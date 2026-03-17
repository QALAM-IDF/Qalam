"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Users, Video, UserRound } from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import FloatingPetals from "@/components/femmes/FloatingPetals";
import CourseCard from "@/components/ui/CourseCard";
import ForfaitCard from "@/components/ui/ForfaitCard";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { forfaits } from "@/data/forfaits";
import TestimonialCard from "@/components/ui/TestimonialCard";
import LeadModal from "@/components/ui/LeadModal";

export default function FemmesPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-[#f7efe3] pt-20 text-[#3f2a1f]">
      <section className="grain-surface grain-overlay relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-[#e8c4a0] via-[#a67c52] to-[#2d4a2d] py-16 text-[#fdf3e8]">
        <ArabicPattern
          className="pointer-events-none"
          color="var(--andalou-ivoire)"
          opacity={0.12}
          size={500}
          animate
        />
        <FloatingPetals />
        <div className="section-shell relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
            style={{ color: "#ffe6d0" }}
          >
            دروس النساء
          </motion.h1>
          <p className="mt-4 font-display text-4xl">Cours d&apos;arabe pour Femmes</p>
          <p className="mt-4 max-w-2xl text-[#ffefdf]">
            Dans un cadre bienveillant et exclusif, explore la richesse de la langue arabe a ton rythme.
          </p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#ffe7d0aa] px-5 py-2"
          >
            <Leaf className="h-4 w-4" /> Ornement floral vivant
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-14">
        <h2 className="font-display text-4xl text-[#7a3535]">Cadre exclusif</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            "Environnement femmes uniquement.",
            "Professeure dediee et accompagnement personalise.",
            "Cadence flexible avec suivi hebdomadaire.",
          ].map((text, idx) => (
            <article key={text} className="rounded-2xl border border-[#c4927a70] bg-[#fff7ef] p-5">
              {idx === 0 ? <ShieldCheck className="h-5 w-5 text-[#7a3535]" /> : <Leaf className="h-5 w-5 text-[#7a3535]" />}
              <p className="mt-3 text-sm">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#7a3535]">Niveaux disponibles</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ["Debutant", "مبتدئ", "Bases de lecture, alphabet et premiers dialogues."],
            ["Intermediaire", "متوسط", "Conversation guidee et grammaire pratique."],
            ["Avance", "متقدم", "Expression ecrite, eloquence et textes classiques."],
            ["Coranique", "تجويد", "Recitation avec precision et memorisation."],
          ].map((level) => (
            <CourseCard
              key={level[0]}
              level={level[0]}
              levelAr={level[1]}
              description={level[2]}
              duration="Forfait 30h"
              theme="femmes"
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#7a3535]">Format des cours</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: UserRound, title: "Cours particuliers" },
            { icon: Users, title: "Groupe 30h (max 8)" },
            { icon: Video, title: "Session Zoom hebdomadaire" },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#c4927a6a] bg-[#fff7ef] p-5">
              <item.icon className="h-5 w-5 text-[#7a3535]" />
              <p className="mt-3 text-sm">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#7a3535]">Galerie de calligraphies</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["مرحبا", "نور", "سلام", "جمال", "رحمة", "حكمة"].map((word) => (
            <article key={word} className="rounded-2xl border border-[#d4af3780] bg-[#fff8f2] p-6 text-center">
              <p className="font-arabic text-5xl text-[#7a3535]">{word}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#7a3535]">Temoignages</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TestimonialCard
            theme="femmes"
            author="Sanaa"
            role="Niveau debutant"
            quote="J'ai adore la douceur du cadre et la clarte des explications."
          />
          <TestimonialCard
            theme="femmes"
            author="Rim"
            role="Niveau intermediaire"
            quote="Chaque seance est elegante, structuree et tres motivante."
          />
          <TestimonialCard
            theme="femmes"
            author="Alya"
            role="Tajwid"
            quote="Le suivi individuel est precis, avec beaucoup de bienveillance."
          />
        </div>
      </section>

      <section className="section-shell py-20" style={{ backgroundColor: "var(--andalou-ivoire)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-center font-arabic text-2xl mb-2" style={{ color: "var(--andalou-bordeaux)" }}>
            الأسعار
          </p>
          <h2 className="text-center font-display text-4xl mb-4 text-[var(--andalou-bordeaux)]">Nos Forfaits</h2>
          <CalligraphyDivider className="mx-auto mb-12 w-48" color="var(--andalou-brique)" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {forfaits.map((f) => (
              <ForfaitCard
                key={f.id}
                forfait={f}
                theme="femmes"
                onSelect={() => setOpen(true)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell pb-16 pt-6">
        <div className="rounded-3xl border border-[#d4af3770] bg-[#fff6ec] p-8 text-center">
          <p className="font-arabic text-4xl text-[#7a3535]">انضمي إلينا</p>
          <h2 className="mt-2 font-display text-5xl text-[#7a3535]">Rejoindre le cercle feminin</h2>
          <button
            onClick={() => setOpen(true)}
            className="mt-6 rounded-full bg-[#7a3535] px-8 py-3 text-sm text-[#fff4ea]"
          >
            Ouvrir le formulaire
          </button>
        </div>
      </section>

      <LeadModal
        open={open}
        onClose={() => setOpen(false)}
        title="Inscription - Univers Femmes"
        accent="#7a3535"
        fields={[
          { name: "nom", label: "Nom" },
          { name: "email", label: "Email", type: "email" },
          { name: "niveau", label: "Niveau" },
        ]}
      />
    </main>
  );
}
