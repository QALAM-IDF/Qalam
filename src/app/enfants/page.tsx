"use client";

import { useState } from "react";
import { Gamepad2, ScrollText, Repeat, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import StarField from "@/components/enfants/StarField";
import CourseCard from "@/components/ui/CourseCard";
import ForfaitCard from "@/components/ui/ForfaitCard";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { forfaits } from "@/data/forfaits";
import TestimonialCard from "@/components/ui/TestimonialCard";
import LeadModal from "@/components/ui/LeadModal";

export default function EnfantsPage() {
  const [open, setOpen] = useState(false);

  return (
    <main id="main-content" className="overflow-hidden bg-[#0a0a2e] pt-20 text-[#fff8dc]">
      <section className="grain-overlay relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-[#0d1b4b] via-[#1a3a6b] to-[#0a0a2e] py-16">
        <StarField />
        <div className="section-shell relative">
          <div className="absolute right-2 top-0 text-5xl text-[#ffd700] md:text-6xl">☾</div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-arabic text-4xl text-[#ffd700] sm:text-5xl md:text-6xl lg:text-8xl"
          >
            دروس الأطفال
          </motion.h1>
          <p className="font-round mt-4 text-3xl md:text-4xl">Cours d&apos;arabe pour Enfants</p>
          <p className="font-round mt-4 max-w-2xl text-[#cfe6ff]">
            Embarque pour un voyage magique au coeur de la langue arabe.
          </p>
          <motion.div
            className="mt-10 inline-block text-5xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🧞
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-14">
        <h2 className="font-display text-4xl text-[#ffd700]">Methode Kids</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: Gamepad2, title: "Jeu", text: "Mini-defis et cartes visuelles pour memoriser." },
            { icon: ScrollText, title: "Histoire", text: "Recits courts pour contextualiser chaque mot." },
            { icon: Repeat, title: "Repetition", text: "Revisions ritualisees et repetition active." },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#4ecdc480] bg-[#132d63]/80 p-5">
              <item.icon className="h-5 w-5 text-[#4ecdc4]" />
              <h3 className="mt-3 font-round text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-[#deecff]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#ffd700]">Niveaux enfants</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <CourseCard
            theme="enfants"
            level="Debutant (5-8 ans)"
            levelAr="مبتدئ"
            description="Alphabet et mots simples en contexte ludique."
            duration="Cycle 8 semaines"
          />
          <CourseCard
            theme="enfants"
            level="Intermediaire (9-12 ans)"
            levelAr="متوسط"
            description="Phrases completes, histoires, dialogue et lecture."
            duration="Cycle 10 semaines"
          />
          <CourseCard
            theme="enfants"
            level="Avance (13-15 ans)"
            levelAr="متقدم"
            description="Expression orale + ecriture structurante et recitation."
            duration="Cycle 12 semaines"
          />
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#ffd700]">Une lecon en images</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            "1. Histoire illustree",
            "2. Mots cles en arabe",
            "3. Jeu oral en equipe",
            "4. Mini mission a la maison",
          ].map((step, idx) => (
            <article key={step} className="rounded-2xl border border-[#ffd70066] bg-[#12295c]/80 p-5 text-center">
              <Sparkles className="mx-auto h-5 w-5 text-[#4ecdc4]" />
              <p className="mt-2 font-round text-sm text-[#e5f0ff]">{step}</p>
              <p className="mt-3 font-arabic text-2xl text-[#ffd700]">{["ا", "ب", "ت", "ث"][idx]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#ffd700]">L&apos;alphabet en magie</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {["ا", "ب", "ت", "ث", "ج", "ح"].map((letter, idx) => (
            <div
              key={letter}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-[#ffd70080] bg-[#1a3a6b] font-arabic text-4xl text-[#ffd700]"
              style={{ animation: `float ${2.6 + idx * 0.2}s ease-in-out infinite` }}
            >
              {letter}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl text-[#ffd700]">Temoignages parents</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TestimonialCard
            theme="enfants"
            author="Parent de Lina"
            role="7 ans"
            quote="Ma fille attend le cours chaque semaine, les exercices sont magiques et efficaces."
          />
          <TestimonialCard
            theme="enfants"
            author="Parent de Sami"
            role="10 ans"
            quote="Le format histoire + repetition est parfait pour garder sa concentration."
          />
          <TestimonialCard
            theme="enfants"
            author="Parent de Youssef"
            role="13 ans"
            quote="Il prend confiance a l'oral et prononce mieux en quelques seances."
          />
        </div>
      </section>

      <section className="section-shell py-20" style={{ backgroundColor: "var(--magie-marine)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-center font-arabic text-2xl mb-2" style={{ color: "var(--magie-or)" }}>
            الأسعار
          </p>
          <h2 className="text-center font-display text-4xl mb-4 text-[var(--magie-or)]">Nos Forfaits</h2>
          <CalligraphyDivider className="mx-auto mb-12 w-48" color="var(--magie-or)" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {forfaits.map((f) => (
              <ForfaitCard
                key={f.id}
                forfait={f}
                theme="enfants"
                onSelect={() => setOpen(true)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell pb-16 pt-6">
        <div className="rounded-3xl border border-[#ffd70080] bg-[#12295c] p-8 text-center">
          <p className="font-arabic text-4xl text-[#ffd700]">سجل طفلك</p>
          <h2 className="font-round mt-2 text-4xl">Inscrire mon enfant</h2>
          <button
            onClick={() => setOpen(true)}
            className="mt-6 rounded-full bg-[#4ecdc4] px-8 py-3 text-sm font-semibold text-[#0a0a2e]"
          >
            Ouvrir le formulaire
          </button>
        </div>
      </section>

      <LeadModal
        open={open}
        onClose={() => setOpen(false)}
        title="Inscription - Univers Enfants"
        accent="#1a3a6b"
        fields={[
          { name: "nom_enfant", label: "Nom de l'enfant" },
          { name: "age", label: "Age", type: "number" },
          { name: "niveau", label: "Niveau" },
          { name: "email_parent", label: "Email parent", type: "email" },
        ]}
      />
    </main>
  );
}
