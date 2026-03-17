"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  BookOpen,
  MousePointer,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const faqCPF: { q: string; a: string }[] = [
  {
    q: "Qu'est-ce que le CPF ?",
    a: "Le Compte Personnel de Formation (CPF) est un dispositif qui permet à chaque actif de financer des formations tout au long de sa vie professionnelle. Chaque année, des droits en euros sont crédités sur votre compte.",
  },
  {
    q: "Qui peut utiliser son CPF pour nos formations ?",
    a: "Tout salarié, demandeur d'emploi ou travailleur indépendant disposant de droits CPF peut financer nos formations linguistiques certifiées.",
  },
  {
    q: "Les formations Qalam sont-elles certifiées ?",
    a: "Oui, nos formations éligibles CPF sont référencées sur Mon Compte Formation et répondent aux critères de qualité Qualiopi.",
  },
  {
    q: "Puis-je utiliser mon CPF pour l'arabe coranique ?",
    a: "Les formations CPF couvrent l'arabe standard (moderne et classique). Pour les formations coraniques, contactez-nous directement pour connaître les options disponibles.",
  },
  {
    q: "Comment savoir si j'ai des droits CPF suffisants ?",
    a: "Connectez-vous sur moncompteformation.gouv.fr avec vos identifiants France Connect. Votre solde disponible s'affiche directement sur votre tableau de bord.",
  },
];

const cpfSteps = [
  {
    title: "Vérifiez votre solde",
    description:
      "Connectez-vous sur moncompteformation.gouv.fr pour consulter vos droits disponibles.",
    icon: CreditCard,
  },
  {
    title: "Choisissez votre formation",
    description:
      "Sélectionnez la langue (Arabe ou Anglais) et le niveau qui correspond à vos objectifs.",
    icon: BookOpen,
  },
  {
    title: "Inscrivez-vous en ligne",
    description:
      "Cliquez sur le bouton CPF correspondant et suivez les étapes sur Mon Compte Formation.",
    icon: MousePointer,
  },
  {
    title: "Commencez votre formation",
    description:
      "Accédez à vos cours en ligne dès validation de votre inscription. Un professeur natif vous accompagne tout au long du parcours.",
    icon: GraduationCap,
  },
];

export default function CpfPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <main className="overflow-hidden">
      {/* Section 1 — Hero CPF */}
      <section
        className="grain-overlay grain-surface relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
        style={{ background: "var(--beige-creme)" }}
      >
        <ArabicPattern
          className="pointer-events-none"
          opacity={0.06}
          color="var(--encre-noire)"
          size={500}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            ✅ Éligible CPF
          </span>
        </motion.div>
        <motion.p
          className="font-arabic relative z-10 mt-6 text-4xl md:text-5xl"
          style={{ color: "var(--or-luxe)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          التكوين المهني
        </motion.p>
        <motion.h1
          className="font-display relative z-10 mt-2 text-4xl font-semibold md:text-5xl"
          style={{ color: "var(--encre-noire)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Formations éligibles CPF
        </motion.h1>
        <motion.p
          className="font-body relative z-10 mt-3 text-xl"
          style={{ color: "var(--encre-douce)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          L&apos;arabe, la clé d&apos;un nouveau monde.
        </motion.p>
        <motion.p
          className="font-arabic relative z-10 mt-1 text-lg"
          style={{ color: "var(--or-luxe)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          العربية مفتاحُ عالمٍ جديد
        </motion.p>
        <motion.p
          className="relative z-10 mx-auto mt-4 max-w-2xl text-sm"
          style={{ color: "var(--encre-douce)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Utilisez vos droits CPF pour apprendre une nouvelle langue et développer
          vos compétences linguistiques.
        </motion.p>
        <motion.div
          className="relative z-10 mx-auto mt-6 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CalligraphyDivider />
        </motion.div>
        <motion.div
          className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="#cpf-formations"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-4 font-display text-lg font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            S&apos;inscrire avec mon CPF
          </a>
          <a
            href="#formations-disponibles"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 px-8 py-4 font-display text-lg font-medium transition-opacity hover:opacity-90"
            style={{
              borderColor: "var(--or-luxe)",
              color: "var(--or-luxe)",
            }}
          >
            En savoir plus ↓
          </a>
        </motion.div>
      </section>

      {/* Section 2 — Intro CPF */}
      <section
        className="section-shell relative py-16 md:py-24"
        style={{ background: "var(--blanc-ivoire)" }}
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="font-display absolute -left-2 -top-4 text-[8rem] font-bold leading-none opacity-[0.05] md:text-[12rem]"
              style={{ color: "var(--encre-noire)" }}
            >
              CPF
            </span>
            <h2
              className="font-display relative text-3xl font-semibold md:text-4xl"
              style={{ color: "var(--encre-noire)" }}
            >
              Vous avez des droits CPF ?
            </h2>
            <p
              className="relative mt-6 leading-relaxed"
              style={{ color: "var(--encre-douce)" }}
            >
              Profitez de votre Compte Personnel de Formation pour apprendre une
              nouvelle langue. Nous proposons plusieurs formations éligibles au CPF,
              avec des modules adaptés à votre niveau et à vos objectifs. Nos
              programmes sont disponibles à différents tarifs et peuvent être
              personnalisés selon vos besoins.
            </p>
          </motion.div>
          <motion.div
            className="rounded-2xl border-2 p-6 md:p-8"
            style={{
              backgroundColor: "var(--beige-chaud)",
              borderColor: "var(--or-brillant)",
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-xl font-semibold" style={{ color: "var(--encre-noire)" }}>
              Les avantages CPF
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Financement 100% pris en charge",
                "Formations certifiées",
                "Modules personnalisés selon votre niveau",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3" style={{ color: "var(--encre-douce)" }}>
                  <span style={{ color: "var(--or-brillant)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Formations disponibles */}
      <section
        id="formations-disponibles"
        className="section-shell relative py-16 md:py-24"
        style={{ background: "var(--beige-creme)" }}
      >
        <span
          className="font-arabic absolute right-4 top-8 text-6xl opacity-[0.06] md:text-8xl"
          style={{ color: "var(--encre-noire)" }}
        >
          التكوينات المتاحة
        </span>
        <motion.h2
          className="font-display text-center text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--encre-noire)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Formations disponibles
        </motion.h2>
        <div className="mx-auto mt-4 max-w-md">
          <CalligraphyDivider />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Card Arabe */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 p-8"
            style={{
              background: "linear-gradient(135deg, var(--desert-horizon) 0%, var(--desert-nuit) 100%)",
              borderColor: "var(--or-brillant)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="font-arabic text-6xl md:text-7xl"
              style={{ color: "var(--or-brillant)", opacity: 0.9 }}
            >
              ع
            </span>
            <h3 className="font-display mt-4 text-2xl font-semibold" style={{ color: "var(--blanc-ivoire)" }}>
              Arabe
            </h3>
            <p className="font-arabic text-lg" style={{ color: "var(--or-brillant)" }}>
              اللغة العربية
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--beige-creme)" }}>
              Du premier alif à la maîtrise de la langue classique. Tous niveaux :
              débutant, intermédiaire, avancé, coranique.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Débutant", "Intermédiaire", "Avancé", "Coranique"].map((l) => (
                <span
                  key={l}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  background: "var(--or-brillant)",
                  color: "var(--encre-noire)",
                }}
              >
                Voir la formation Arabe
              </a>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--andalou-feuille)",
                  color: "var(--blanc-ivoire)",
                }}
              >
                Éligible CPF ✅
              </span>
            </div>
          </motion.div>

          {/* Card Anglais */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 p-8"
            style={{
              background: "linear-gradient(135deg, var(--magie-marine) 0%, var(--magie-indigo) 100%)",
              borderColor: "var(--or-brillant)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="font-display text-6xl font-bold md:text-7xl"
              style={{ color: "var(--or-brillant)", opacity: 0.9 }}
            >
              A
            </span>
            <h3 className="font-display mt-4 text-2xl font-semibold" style={{ color: "var(--blanc-ivoire)" }}>
              Anglais
            </h3>
            <p className="font-arabic text-lg" style={{ color: "var(--magie-turquoise)" }}>
              اللغة الإنجليزية
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--beige-creme)" }}>
              Maîtrisez l&apos;anglais professionnel et conversationnel. Modules adaptés
              à vos objectifs.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Débutant", "Intermédiaire", "Avancé", "Business"].map((l) => (
                <span
                  key={l}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  background: "var(--or-brillant)",
                  color: "var(--encre-noire)",
                }}
              >
                Voir la formation Anglais
              </a>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--andalou-feuille)",
                  color: "var(--blanc-ivoire)",
                }}
              >
                Éligible CPF ✅
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Comment ça marche */}
      <section
        className="section-shell py-16 md:py-24"
        style={{ background: "var(--blanc-ivoire)" }}
      >
        <motion.h2
          className="font-display text-center text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--encre-noire)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Comment utiliser votre CPF ?
        </motion.h2>
        <div className="mx-auto mt-4 max-w-md">
          <CalligraphyDivider />
        </div>
        <div className="relative mt-12">
          <div className="hidden lg:absolute lg:left-0 lg:right-0 lg:top-12 lg:h-0.5 lg:opacity-40"
            style={{ backgroundColor: "var(--or-brillant)" }}
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {cpfSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      backgroundColor: "var(--blanc-ivoire)",
                      borderColor: "var(--or-brillant)",
                      color: "var(--or-luxe)",
                    }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-4">
                    <h3
                      className="font-display text-lg font-semibold"
                      style={{ color: "var(--encre-noire)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--encre-douce)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Liens CPF */}
      <section
        id="cpf-formations"
        className="section-shell py-16 md:py-24"
        style={{ background: "var(--beige-creme)" }}
      >
        <motion.h2
          className="font-display text-center text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--encre-noire)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Accéder aux formations CPF
        </motion.h2>
        <p
          className="mx-auto mt-4 max-w-xl text-center text-sm"
          style={{ color: "var(--encre-douce)" }}
        >
          Cliquez sur le bouton correspondant à votre formation pour accéder
          directement à Mon Compte Formation.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            id="lien-cpf-arabe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-lg font-medium transition-opacity hover:opacity-90 sm:flex-initial"
            style={{
              background: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            🎓 S&apos;inscrire avec mon CPF — Arabe
          </a>
          <a
            href="#"
            id="lien-cpf-anglais"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-lg font-medium transition-opacity hover:opacity-90 sm:flex-initial"
            style={{
              background: "var(--encre-noire)",
              color: "var(--or-brillant)",
            }}
          >
            🎓 S&apos;inscrire avec mon CPF — Anglais
          </a>
        </div>
        <p
          className="mx-auto mt-6 max-w-lg text-center text-xs"
          style={{ color: "var(--encre-douce)" }}
        >
          Vous serez redirigé vers moncompteformation.gouv.fr, la plateforme
          officielle du Compte Personnel de Formation.
        </p>
        <p className="mt-4 text-center">
          <a
            href="https://www.moncompteformation.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm font-medium underline"
            style={{ color: "var(--or-luxe)" }}
          >
            Accéder à Mon Compte Formation →
          </a>
        </p>
      </section>

      {/* Section 6 — FAQ CPF */}
      <section
        className="section-shell py-12 md:py-16"
        style={{ background: "var(--blanc-ivoire)" }}
      >
        <motion.h2
          className="font-display text-center text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--encre-noire)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          FAQ CPF
        </motion.h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-2">
          {faqCPF.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border bg-[var(--blanc-ivoire)]"
              style={{ borderColor: "var(--or-brillant)" }}
            >
              <button
                type="button"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                style={{ color: "var(--encre-noire)" }}
                aria-expanded={faqOpen === idx}
              >
                <span className="font-display text-lg">{item.q}</span>
                <motion.span
                  animate={{ rotate: faqOpen === idx ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-5 w-5" style={{ color: "var(--or-luxe)" }} />
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
                    <p
                      className="border-t px-4 pb-4 pt-2 text-sm"
                      style={{
                        borderColor: "var(--or-brillant)",
                        color: "var(--encre-douce)",
                      }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section
        className="section-shell py-20 text-center"
        style={{ background: "var(--encre-noire)" }}
      >
        <motion.p
          className="font-arabic text-4xl"
          style={{ color: "var(--or-brillant)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ابدأ رحلتك
        </motion.p>
        <motion.h2
          className="font-display mt-2 text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--blanc-ivoire)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Prêt à commencer avec votre CPF ?
        </motion.h2>
        <motion.p
          className="mx-auto mt-3 max-w-md text-sm"
          style={{ color: "var(--beige-creme)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Vos droits CPF vous attendent. Commencez dès aujourd&apos;hui.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="#cpf-formations"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-4 font-display font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            S&apos;inscrire avec mon CPF
          </a>
          <Link
            href="/#contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 px-8 py-4 font-display font-medium transition-opacity hover:opacity-90"
            style={{
              borderColor: "var(--or-brillant)",
              color: "var(--or-brillant)",
            }}
          >
            Nous contacter
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
