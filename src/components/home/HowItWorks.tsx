"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Play, TrendingUp, ArrowRight } from "lucide-react";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const steps = [
  {
    title: "Choisissez votre forfait",
    titleAr: "اختر عرضك",
    href: "/tarifs",
    icon: CreditCard,
  },
  {
    title: "Accédez à vos vidéos",
    titleAr: "شاهد دروسك",
    icon: Play,
  },
  {
    title: "Progressez à votre rythme",
    titleAr: "تقدم في مسيرتك",
    href: "/espace-membre",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section className="grain-surface bg-[var(--blanc-ivoire)] py-16 md:py-24">
      <div className="section-shell">
        <div className="text-center">
          <p className="font-arabic text-4xl text-[var(--or-luxe)]">كيف يعمل</p>
          <h2 className="font-display text-5xl text-[var(--encre-noire)]">
            Comment ça marche
          </h2>
          <div className="mx-auto mt-3 max-w-lg">
            <CalligraphyDivider />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const content = (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.2)",
                    color: "var(--or-brillant)",
                  }}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mt-4 font-arabic text-xl" style={{ color: "var(--or-luxe)" }}>
                  {s.titleAr}
                </p>
                <p className="mt-1 font-display text-lg" style={{ color: "var(--encre-noire)" }}>
                  {s.title}
                </p>
              </motion.div>
            );

            return (
              <div key={s.title} className="flex items-center gap-4 md:gap-6">
                {s.href ? (
                  <Link href={s.href} className="group">
                    {content}
                    <p
                      className="mt-2 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: "var(--or-brillant)" }}
                    >
                      En savoir plus →
                    </p>
                  </Link>
                ) : (
                  content
                )}
                {idx < steps.length - 1 && (
                  <ArrowRight
                    className="hidden h-6 w-6 shrink-0 md:block"
                    style={{ color: "var(--or-luxe)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
