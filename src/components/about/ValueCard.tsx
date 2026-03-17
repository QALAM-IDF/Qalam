"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, TrendingUp } from "lucide-react";

const values = [
  {
    wordAr: "العلم",
    title: "La Science",
    description:
      "Un enseignement rigoureux, fidèle à la tradition de la langue arabe classique.",
    icon: BookOpen,
    accent: "var(--or-luxe)",
  },
  {
    wordAr: "الإخلاص",
    title: "La Sincérité",
    description:
      "Des professeurs natifs, passionnés, qui transmettent avec le cœur.",
    icon: Heart,
    accent: "var(--andalou-bordeaux)",
  },
  {
    wordAr: "التقدم",
    title: "Le Progrès",
    description:
      "Une méthode structurée qui garantit une progression visible dès la première séance.",
    icon: TrendingUp,
    accent: "var(--desert-ambre)",
  },
];

type ValueCardProps = {
  index?: number;
};

export default function ValueCards({ index = 0 }: ValueCardProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((v, i) => {
        const Icon = v.icon;
        return (
          <motion.article
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (index + i) * 0.15 }}
            className="overflow-hidden rounded-2xl border-2 bg-[var(--blanc-ivoire)] pb-1"
            style={{
              borderBottomWidth: "4px",
              borderColor: "var(--beige-profond)",
              borderBottomColor: v.accent,
            }}
          >
            <div className="p-6">
              <p
                className="font-arabic text-4xl font-medium"
                style={{ color: "var(--or-luxe)" }}
              >
                {v.wordAr}
              </p>
              <Icon
                className="mt-4 h-7 w-7"
                style={{ color: v.accent }}
              />
              <h3
                className="mt-3 font-display text-xl font-semibold"
                style={{ color: "var(--encre-noire)" }}
              >
                {v.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--encre-douce)" }}
              >
                {v.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
