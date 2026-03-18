"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Wallet, Building2, ChevronDown, Gamepad2, BookOpen, Repeat } from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import ForfaitCard from "@/components/ui/ForfaitCard";
import ProgrammeAccordion from "@/components/ui/ProgrammeAccordion";
import LeadModal from "@/components/ui/LeadModal";
import { forfaitsByCategorie, forfaitsParticulier } from "@/data/forfaits";
import { programmes } from "@/data/programmes";

type TarifTab = "hommes" | "femmes" | "enfants" | "particulier";

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

const methodeKidsCards = [
  { icon: Gamepad2, title: "Jeu", desc: "Mini-défis et cartes visuelles pour mémoriser", color: "var(--magie-turquoise)" },
  { icon: BookOpen, title: "Histoire", desc: "Récits courts pour contextualiser chaque mot", color: "var(--magie-or)" },
  { icon: Repeat, title: "Répétition", desc: "Révisions ritualisées et répétition active", color: "var(--magie-etoile)" },
];

export default function TarifsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedForfaitName, setSelectedForfaitName] = useState<string>("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TarifTab>("hommes");

  const handleSelect = (forfaitIdOrName: string) => {
    const forfait = [...forfaitsByCategorie.hommes, ...forfaitsByCategorie.femmes, ...forfaitsByCategorie.enfants, ...forfaitsParticulier].find(
      (f) => f.id === forfaitIdOrName || f.name === forfaitIdOrName
    );
    setSelectedForfaitName(forfait?.name ?? forfaitIdOrName);
    setModalOpen(true);
  };

  const tabs = [
    { id: "hommes" as const, label: "Hommes" },
    { id: "femmes" as const, label: "Femmes" },
    { id: "enfants" as const, label: "Enfants" },
    { id: "particulier" as const, label: "Cours Particuliers" },
  ];

  return (
    <main id="main-content" className="overflow-hidden bg-[var(--beige-creme)] pt-20">
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
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className="px-5 py-2 rounded-full font-body text-sm transition-all"
              style={{
                background: activeTab === t.id ? "var(--or-brillant)" : "var(--beige-chaud)",
                color: activeTab === t.id ? "var(--encre-noire)" : "var(--encre-douce)",
                fontWeight: activeTab === t.id ? 700 : 400,
                border: activeTab === t.id ? "2px solid var(--or-brillant)" : "1px solid var(--beige-profond)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "hommes" && (
          <motion.div
            key="hommes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 mb-8"
            style={{ background: "var(--desert-horizon)", border: "1px solid var(--desert-ambre)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4">
              {forfaitsByCategorie.hommes.map((f) => (
                <ForfaitCard key={f.id} forfait={f} theme="hommes" compact onSelect={() => handleSelect(f.name)} />
              ))}
              {forfaitsParticulier[0] && (
                <ForfaitCard
                  forfait={forfaitsParticulier[0]}
                  theme="hommes"
                  compact
                  onSelect={() => handleSelect(forfaitsParticulier[0].name)}
                />
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "femmes" && (
          <motion.div
            key="femmes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 mb-8"
            style={{ background: "var(--andalou-ivoire)", border: "1px solid var(--andalou-brique)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4">
              {forfaitsByCategorie.femmes.map((f) => (
                <ForfaitCard key={f.id} forfait={f} theme="femmes" compact onSelect={() => handleSelect(f.name)} />
              ))}
              {forfaitsParticulier[1] && (
                <ForfaitCard
                  forfait={forfaitsParticulier[1]}
                  theme="femmes"
                  compact
                  onSelect={() => handleSelect(forfaitsParticulier[1].name)}
                />
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "enfants" && (
          <motion.div
            key="enfants"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto px-4"
          >
            <div className="mb-10">
              <p className="text-center font-arabic text-2xl text-[var(--or-luxe)]">طريقة الأطفال</p>
              <h2 className="mt-2 text-center font-display text-2xl text-[var(--encre-noire)]">Méthode Kids</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {methodeKidsCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border-2 p-5 text-center"
                    style={{ borderColor: card.color, backgroundColor: "var(--blanc-ivoire)" }}
                  >
                    <card.icon className="mx-auto h-10 w-10 mb-2" style={{ color: card.color }} />
                    <h3 className="font-display text-lg text-[var(--encre-noire)]">{card.title}</h3>
                    <p className="text-sm mt-1 text-[var(--encre-douce)]">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <CalligraphyDivider className="mx-auto my-10 w-48" />

            <div className="mb-12">
              <div className="text-center mb-6">
                <span
                  className="inline-block px-5 py-1.5 rounded-full font-display text-lg mb-2"
                  style={{
                    background: "var(--magie-indigo)",
                    color: "var(--magie-or)",
                    border: "1px solid var(--magie-or)",
                  }}
                >
                  ✨ 5 – 8 ans
                </span>
                <p className="font-arabic text-xl" style={{ color: "var(--or-luxe)" }}>
                  المبتدئون الصغار
                </p>
                <p className="font-body text-sm mt-1" style={{ color: "var(--encre-douce)" }}>
                  Alphabet et mots simples en contexte ludique · Cycle 8 semaines
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  {forfaitsByCategorie.enfants.find((f) => f.id === "enfant-5-8") && (
                    <ForfaitCard
                      forfait={forfaitsByCategorie.enfants.find((f) => f.id === "enfant-5-8")!}
                      theme="default"
                      compact
                      onSelect={() => handleSelect("enfant-5-8")}
                    />
                  )}
                </div>
              </div>
            </div>

            <CalligraphyDivider className="mx-auto my-8 w-36 opacity-40" />

            <div className="mb-12">
              <div className="text-center mb-6">
                <span
                  className="inline-block px-5 py-1.5 rounded-full font-display text-lg mb-2"
                  style={{
                    background: "var(--magie-marine)",
                    color: "var(--magie-turquoise)",
                    border: "1px solid var(--magie-turquoise)",
                  }}
                >
                  🌟 9 – 12 ans
                </span>
                <p className="font-arabic text-xl" style={{ color: "var(--or-luxe)" }}>
                  المتوسطون
                </p>
                <p className="font-body text-sm mt-1" style={{ color: "var(--encre-douce)" }}>
                  Phrases complètes, histoires, dialogue et lecture · Cycle 10 semaines
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  {forfaitsByCategorie.enfants.find((f) => f.id === "enfant-9-12") && (
                    <ForfaitCard
                      forfait={forfaitsByCategorie.enfants.find((f) => f.id === "enfant-9-12")!}
                      theme="default"
                      compact
                      onSelect={() => handleSelect("enfant-9-12")}
                    />
                  )}
                </div>
              </div>
            </div>

            <CalligraphyDivider className="mx-auto my-8 w-36 opacity-40" />

            <div className="mb-12">
              <div className="text-center mb-6">
                <span
                  className="inline-block px-5 py-1.5 rounded-full font-display text-lg mb-2"
                  style={{
                    background: "var(--desert-horizon)",
                    color: "var(--desert-ambre)",
                    border: "1px solid var(--desert-ambre)",
                  }}
                >
                  🎓 13 – 15 ans
                </span>
                <p className="font-arabic text-xl" style={{ color: "var(--or-luxe)" }}>
                  المتقدمون
                </p>
                <p className="font-body text-sm mt-1" style={{ color: "var(--encre-douce)" }}>
                  Expression orale, écriture structurée et récitation · Cycle 12 semaines
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  {forfaitsByCategorie.enfants.find((f) => f.id === "enfant-13-15") && (
                    <ForfaitCard
                      forfait={forfaitsByCategorie.enfants.find((f) => f.id === "enfant-13-15")!}
                      theme="default"
                      compact
                      onSelect={() => handleSelect("enfant-13-15")}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "particulier" && (
          <motion.div
            key="particulier"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4"
          >
            {forfaitsParticulier.map((f) => (
              <ForfaitCard key={f.id} forfait={f} theme="default" compact onSelect={() => handleSelect(f.name)} />
            ))}
          </motion.div>
        )}
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
