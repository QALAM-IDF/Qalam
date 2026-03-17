"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { teachers } from "@/data/teachers";
import TeacherCard from "./TeacherCard";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

export default function HomeTeachersPreview() {
  return (
    <section className="grain-surface bg-[var(--beige-creme)] py-16 md:py-24">
      <div className="section-shell">
        <div className="text-center">
          <p className="font-arabic text-4xl text-[var(--or-luxe)]">أَسَاتِذَتُنَا</p>
          <h2 className="font-display text-5xl text-[var(--encre-noire)] mt-2">
            Nos Professeurs
          </h2>
          <div className="mx-auto mt-3 max-w-lg">
            <CalligraphyDivider />
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <Link
              key={teacher.id}
              href="/a-propos#professeurs"
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeacherCard
                  teacher={teacher}
                  onClick={() => {}}
                  index={index}
                  compact
                />
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/a-propos#professeurs"
            className="inline-flex items-center gap-2 font-display text-lg font-medium transition-opacity hover:opacity-90"
            style={{ color: "var(--or-luxe)" }}
          >
            Rencontrer l&apos;équipe →
          </Link>
        </div>
      </div>
    </section>
  );
}
