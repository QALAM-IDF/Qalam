"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeCpfSection() {
  return (
    <section
      className="grain-overlay grain-surface py-16 md:py-20"
      style={{ background: "var(--beige-chaud)" }}
    >
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
            <h2
              className="font-display mt-4 text-3xl font-semibold md:text-4xl"
              style={{ color: "var(--encre-noire)" }}
            >
              Formations finançables par le CPF
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed md:text-base"
              style={{ color: "var(--encre-douce)" }}
            >
              Utilisez vos droits CPF pour apprendre l&apos;arabe ou l&apos;anglais.
              Modules certifiés, tous niveaux.
            </p>
            <Link
              href="/cpf"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border-2 px-6 py-3 font-display font-medium transition-opacity hover:opacity-90"
              style={{
                borderColor: "var(--or-luxe)",
                color: "var(--or-luxe)",
              }}
            >
              Voir les formations CPF →
            </Link>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium"
              style={{
                borderColor: "var(--or-brillant)",
                color: "var(--encre-noire)",
                backgroundColor: "var(--blanc-ivoire)",
              }}
            >
              🇫🇷 Arabe — Éligible CPF
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium"
              style={{
                borderColor: "var(--or-brillant)",
                color: "var(--encre-noire)",
                backgroundColor: "var(--blanc-ivoire)",
              }}
            >
              🇬🇧 Anglais — Éligible CPF
            </span>
            <a
              href="https://www.moncompteformation.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline"
              style={{ color: "var(--or-luxe)" }}
            >
              moncompteformation.gouv.fr ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
