"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Teacher } from "@/data/teachers";

const themeGradients: Record<Teacher["avatarTheme"], string> = {
  hommes: "linear-gradient(180deg, var(--desert-horizon) 0%, var(--desert-nuit) 100%)",
  femmes: "linear-gradient(180deg, var(--andalou-ivoire) 0%, var(--andalou-rose) 100%)",
  coranique: "linear-gradient(180deg, var(--magie-indigo) 0%, var(--magie-marine) 100%)",
};

type TeacherCardProps = {
  teacher: Teacher;
  onClick: () => void;
  index?: number;
  compact?: boolean;
};

export default function TeacherCard({
  teacher,
  onClick,
  index = 0,
  compact = false,
}: TeacherCardProps) {
  const gradient = themeGradients[teacher.avatarTheme];

  if (compact) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={onClick}
        className="cursor-pointer overflow-hidden rounded-xl border-2 transition-shadow hover:shadow-lg"
        style={{
          backgroundColor: "var(--blanc-ivoire)",
          borderColor: "var(--or-brillant)",
        }}
      >
        <div className="flex items-center gap-4 p-4">
          {teacher.avatarUrl ? (
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2"
              style={{ borderColor: "var(--or-brillant)" }}
            >
              <Image
                src={teacher.avatarUrl}
                alt={`Photo de ${teacher.name}`}
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-lg font-semibold"
              style={{
                background: gradient,
                borderColor: "var(--or-brillant)",
                color: "var(--blanc-ivoire)",
              }}
            >
              {teacher.avatarInitials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg" style={{ color: "var(--encre-noire)" }}>
              {teacher.name}
            </p>
            <p className="font-arabic text-sm italic" style={{ color: "var(--or-luxe)" }}>
              {teacher.nameAr}
            </p>
            <p className="text-xs italic" style={{ color: "var(--encre-douce)" }}>
              {teacher.role}
            </p>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="flex h-[400px] flex-col overflow-hidden rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: "var(--blanc-ivoire)",
        borderColor: "var(--beige-profond)",
        boxShadow: "0 4px 20px -4px rgba(184, 134, 11, 0.15)",
      }}
    >
      <div
        className="relative flex h-[40%] min-h-[140px] items-center justify-center"
        style={{ background: gradient }}
      >
        {teacher.avatarUrl ? (
          <div
            className="relative h-20 w-20 overflow-hidden rounded-full border-2"
            style={{ borderColor: "var(--or-brillant)" }}
          >
            <Image
              src={teacher.avatarUrl}
              alt={`Photo de ${teacher.name}`}
              fill
              sizes="80px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 text-2xl font-semibold"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              borderColor: "var(--or-brillant)",
              color: "var(--blanc-ivoire)",
            }}
          >
            {teacher.avatarInitials}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-xl font-semibold" style={{ color: "var(--encre-noire)" }}>
          {teacher.name}
        </p>
        <p className="font-arabic text-sm italic" style={{ color: "var(--or-luxe)" }}>
          {teacher.nameAr}
        </p>
        <p className="mt-1 text-sm italic" style={{ color: "var(--encre-douce)" }}>
          {teacher.role}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--beige-chaud)",
              color: "var(--encre-noire)",
            }}
          >
            {teacher.students}+ élèves
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--beige-chaud)",
              color: "var(--encre-noire)",
            }}
          >
            {teacher.experience} d&apos;exp.
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {teacher.specialites.matieres.slice(0, 3).map((m) => (
            <span
              key={m}
              className="rounded px-1.5 py-0.5 text-xs"
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                color: "var(--or-luxe)",
              }}
            >
              {m}
            </span>
          ))}
        </div>
        {teacher.quote && (
          <p
            className="mt-2 line-clamp-2 font-arabic text-sm italic"
            style={{ color: "var(--or-luxe)" }}
          >
            {teacher.quote}
          </p>
        )}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-auto rounded-xl border-2 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--or-luxe)] hover:text-[var(--encre-noire)]"
          style={{
            borderColor: "var(--or-brillant)",
            color: "var(--or-luxe)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Voir le profil
        </motion.button>
      </div>
    </motion.article>
  );
}
