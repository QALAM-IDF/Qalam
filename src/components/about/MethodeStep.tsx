"use client";

import { motion } from "framer-motion";
import { Target, Map, Users, BarChart2 } from "lucide-react";

const steps = [
  {
    title: "Test de positionnement gratuit",
    description:
      "Un entretien de 15 minutes pour évaluer votre niveau et définir votre objectif.",
    icon: Target,
  },
  {
    title: "Programme sur mesure",
    description:
      "Un parcours adapté à votre niveau, votre univers (H/F/Enfants) et vos objectifs.",
    icon: Map,
  },
  {
    title: "Cours en groupe ou particulier",
    description:
      "Sessions Zoom enregistrées, max 8 élèves par groupe. Replay illimité.",
    icon: Users,
  },
  {
    title: "Suivi et évaluation",
    description:
      "Quiz de révision, bilan mensuel et messagerie directe avec votre professeur.",
    icon: BarChart2,
  },
];

export default function MethodeStep() {
  return (
    <div className="relative">
      <div className="hidden lg:absolute lg:left-0 lg:right-0 lg:top-12 lg:h-0.5 lg:bg-[var(--or-brillant)] lg:opacity-40" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center lg:items-center"
            >
              <div
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-xl font-semibold"
                style={{
                  backgroundColor: "var(--blanc-ivoire)",
                  borderColor: "var(--or-brillant)",
                  color: "var(--or-luxe)",
                }}
              >
                {i + 1}
              </div>
              <div className="mt-4 flex flex-col items-center lg:mt-6">
                <Icon
                  className="mb-2 h-8 w-8"
                  style={{ color: "var(--or-luxe)" }}
                />
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
              {i < steps.length - 1 && (
                <div
                  className="absolute left-7 top-14 hidden h-[calc(100%-3rem)] w-0.5 lg:block"
                  style={{ backgroundColor: "var(--or-brillant)", opacity: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
