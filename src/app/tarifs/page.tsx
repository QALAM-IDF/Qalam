"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Wallet, Building2, ChevronDown } from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import ForfaitCard from "@/components/ui/ForfaitCard";
import ProgrammeAccordion from "@/components/ui/ProgrammeAccordion";
import LeadModal from "@/components/ui/LeadModal";
import { forfaits } from "@/data/forfaits";
import { programmes } from "@/data/programmes";

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Carte bancaire",
    text: "Paiement sécurisé via Stripe (bientôt disponible)",
  },
  {
    icon: Wallet,
    title: "PayPal",
    text: "Règlement rapide via votre compte PayPal",
  },
  {
    icon: Building2,
    title: "Virement bancaire",
    text: "Coordonnées communiquées après inscription",
  },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: "Les forfaits sont-ils remboursables ?",
    a: "En cas d'empêchement, le forfait est reportable. Conditions détaillées à l'inscription.",
  },
  {
    q: "Puis-je changer de forfait en cours de route ?",
    a: "Oui, un upgrade est possible à tout moment (différence au prorata).",
  },
  {
    q: "Les cours sont-ils mixtes ?",
    a: "Non. Chaque univers est séparé : cours hommes, cours femmes, cours enfants — avec professeurs dédiés.",
  },
  {
    q: "Que se passe-t-il si je rate une séance ?",
    a: "Chaque séance est enregistrée et disponible en replay dans votre espace.",
  },
  {
    q: "Comment se déroule l'évaluation de niveau ?",
    a: "Un test de positionnement gratuit de 15 minutes est proposé avant l'inscription.",
  },
];

export default function TarifsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedForfaitName, setSelectedForfaitName] = useState<string>("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const openModal = (forfaitName: string) => {
    setSelectedForfaitName(forfaitName);
    setModalOpen(true);
  };

  return (
    <main className="overflow-hidden bg-[var(--beige-creme)] pt-20">
      <section className="grain-surface relative overflow-hidden bg-[var(--beige-creme)] pb-16 pt-12">
        <ArabicPattern
          className="pointer-events-none"
          opacity={0.06}
          color="var(--encre-douce)"
          size={400}
        />
        <div className="section-shell relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-arabic text-5xl text-[var(--or-luxe)] md:text-6xl"
          >
            الأسعار
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-display text-4xl text-[var(--encre-noire)] md:text-5xl"
          >
            Nos Forfaits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-[var(--encre-douce)]"
          >
            Un investissement pour la vie. La langue du Coran, de la culture et du monde.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-lg"
          >
            <CalligraphyDivider />
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 md:grid md:max-w-6xl md:grid-cols-3 md:gap-8 md:mx-auto"
        >
          {forfaits.map((f) => (
            <ForfaitCard
              key={f.id}
              forfait={f}
              theme="default"
              onSelect={() => openModal(f.name)}
            />
          ))}
        </motion.div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-center font-arabic text-3xl text-[var(--or-luxe)]">المناهج</p>
          <h2 className="mt-2 text-center font-display text-4xl text-[var(--encre-noire)]">
            Nos Programmes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--encre-douce)]">
            Du premier alif à la récitation coranique — un chemin balisé pour chaque apprenant.
          </p>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {programmes.map((prog, idx) => (
              <div key={prog.id}>
                <ProgrammeAccordion programme={prog} theme="default" index={idx} />
                {idx < programmes.length - 1 && (
                  <CalligraphyDivider
                    className="my-4 mx-auto h-4 w-32"
                    color="var(--or-brillant)"
                    compact
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-center font-display text-4xl text-[var(--encre-noire)]">
            Modes de Paiement
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {paymentMethods.map((pm) => (
              <article
                key={pm.title}
                className="rounded-2xl border border-[var(--or-brillant)]/50 bg-[var(--blanc-ivoire)] p-5 text-center"
              >
                <pm.icon className="mx-auto h-8 w-8 text-[var(--or-luxe)]" />
                <h3 className="mt-3 font-display text-xl text-[var(--encre-noire)]">{pm.title}</h3>
                <p className="mt-2 text-sm text-[var(--encre-douce)]">{pm.text}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm italic text-[var(--encre-douce)]">
            Paiement en plusieurs fois disponible sur demande pour le forfait Essentiel et Intensif.
          </p>
        </motion.div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-center font-display text-4xl text-[var(--encre-noire)]">
            FAQ Tarifs
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-2">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[var(--or-brillant)]/30 bg-[var(--blanc-ivoire)]"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-[var(--encre-noire)]"
                  aria-expanded={faqOpen === idx}
                >
                  <span className="font-display text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === idx ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[var(--or-luxe)]" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-[var(--or-brillant)]/20 px-4 pb-4 pt-2 text-sm text-[var(--encre-douce)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell pb-20 pt-8 text-center">
        <CalligraphyDivider className="mx-auto max-w-md" />
        <a
          href="#contact"
          className="mt-8 inline-block rounded-full border-2 border-[var(--or-luxe)] bg-[var(--or-luxe)] px-8 py-3 font-display text-lg text-[var(--blanc-ivoire)] transition-opacity hover:opacity-90"
        >
          Une question ? Contactez-nous
        </a>
      </section>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Inscription — ${selectedForfaitName || "Forfait"}`}
        accent="var(--or-brillant)"
        fields={[
          { name: "name", label: "Prénom et Nom" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Téléphone", type: "tel" },
          { name: "niveau", label: "Niveau actuel" },
          { name: "univers", label: "Univers souhaité (Hommes / Femmes / Enfants)" },
        ]}
      />
    </main>
  );
}
