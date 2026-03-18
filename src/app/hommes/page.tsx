"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Star, Mountain, UserRound, Users, Video } from "lucide-react";
import SandParticles from "@/components/hommes/SandParticles";
import CourseCard from "@/components/ui/CourseCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import ForfaitCard from "@/components/ui/ForfaitCard";
import LeadModal from "@/components/ui/LeadModal";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { forfaits } from "@/data/forfaits";

const levels = [
  ["Debutant", "مبتدئ", "Fondations solides, lecture et vocabulaire du quotidien."],
  ["Intermediaire", "متوسط", "Conversation dirigee, precision grammaticale et ecoute active."],
  ["Avance", "متقدم", "Analyse de textes, expression nuancee et argumentation."],
  ["Coranique", "تجويد", "Recitation et regles de tajwid avec correction individualisee."],
] as const;

export default function HommesPage() {
  const [open, setOpen] = useState(false);

  return (
    <main id="main-content" className="overflow-hidden bg-[#1a0800] pt-20 text-[#f5e6c8]">
      <section className="grain-surface grain-overlay relative min-h-[88vh] bg-gradient-to-b from-[#8b5e3c] via-[#3d1f0a] to-[#1a0800] py-16">
        <SandParticles />
        <div className="section-shell px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-arabic text-4xl text-[#f5e6c8] sm:text-5xl md:text-6xl lg:text-8xl"
          >
            دروس الرجال
          </motion.h1>
          <p className="mt-4 font-display text-3xl md:text-4xl">Cours d&apos;arabe pour Hommes</p>
          <p className="mt-4 max-w-2xl text-[#f2d6b8]">
            Un apprentissage rigoureux, ancre dans la tradition. Forge ta maitrise de la langue arabe.
          </p>

          <div className="mt-10 flex flex-col gap-4 px-0 md:grid md:grid-cols-3">
            {[
              { icon: Compass, text: "Cap pedagogique clair, progression hebdomadaire." },
              { icon: Star, text: "Exigence et discipline dans un cadre fraternel." },
              { icon: Mountain, text: "Objectif: autonomie linguistique durable." },
            ].map((item) => (
              <article
                key={item.text}
                className="card-hover rounded-2xl border border-[#c17f2480] bg-[#2b1609]/65 p-5"
              >
                <item.icon className="h-5 w-5 text-[#c17f24]" />
                <p className="mt-3 text-sm text-[#f5e6c8]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 180" fill="none" aria-hidden>
          <path d="M0 140C160 102 278 130 440 120C602 108 720 52 890 58C1060 64 1200 140 1440 102V180H0V140Z" fill="#2a1106" />
          <path d="M0 150C200 120 300 152 480 142C680 130 750 88 925 94C1100 100 1250 158 1440 132V180H0V150Z" fill="#1a0800" />
        </svg>
      </section>

      <section className="section-shell py-14">
        <h2 className="font-display text-4xl">Niveaux disponibles</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {levels.map((level) => (
            <CourseCard
              key={level[0]}
              level={level[0]}
              levelAr={level[1]}
              description={level[2]}
              duration="Forfait 30h"
              theme="hommes"
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl">Format des cours</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: UserRound, title: "Cours particuliers", text: "Accompagnement 1:1 cible sur ton niveau." },
            { icon: Users, title: "Groupe 30h", text: "Max 8 hommes, dynamique collective et suivi." },
            { icon: Video, title: "Zoom hebdomadaire", text: "Sessions live + plateforme de revision." },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#c17f2475] bg-[#2b1609]/70 p-5">
              <item.icon className="h-5 w-5 text-[#c17f24]" />
              <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-[#f3ddc6]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="font-display text-4xl">Temoignages</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <TestimonialCard
            theme="hommes"
            author="Yassine"
            role="Niveau intermediaire"
            quote="Structure solide, corrections precises, progression visible en quelques semaines."
          />
          <TestimonialCard
            theme="hommes"
            author="Karim"
            role="Niveau avance"
            quote="Les cours m'ont donne une vraie discipline de lecture et de conversation."
          />
          <TestimonialCard
            theme="hommes"
            author="Mounir"
            role="Tajwid"
            quote="Le suivi vocal sur la recitation est exigeant et tres utile."
          />
        </div>
      </section>

      <section className="section-shell py-20" style={{ backgroundColor: "var(--desert-horizon)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-center font-arabic text-2xl mb-2" style={{ color: "var(--desert-ambre)" }}>
            الأسعار
          </p>
          <h2 className="text-center font-display text-4xl mb-4 text-[var(--desert-etoile)]">Nos Forfaits</h2>
          <CalligraphyDivider className="mx-auto mb-12 w-48" color="var(--desert-ambre)" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {forfaits.map((f) => (
              <ForfaitCard
                key={f.id}
                forfait={f}
                theme="hommes"
                onSelect={() => setOpen(true)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell pb-16 pt-6">
        <div className="rounded-3xl border border-[#c17f2480] bg-[#2b1609]/80 p-8 text-center">
          <p className="font-arabic text-4xl text-[#f5e6c8]">ابدأ رحلتك</p>
          <h2 className="mt-2 font-display text-5xl">Commencer mon parcours</h2>
          <button
            onClick={() => setOpen(true)}
            className="mt-6 rounded-full bg-[#c17f24] px-8 py-3 text-sm font-semibold text-[#1a0800]"
          >
            Ouvrir le formulaire
          </button>
        </div>
      </section>

      <LeadModal
        open={open}
        onClose={() => setOpen(false)}
        title="Inscription - Univers Hommes"
        accent="#c17f24"
        fields={[
          { name: "nom", label: "Nom" },
          { name: "email", label: "Email", type: "email" },
          { name: "niveau", label: "Niveau" },
        ]}
      />
    </main>
  );
}
