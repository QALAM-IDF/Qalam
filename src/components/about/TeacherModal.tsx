"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import Link from "next/link";
import type { Teacher } from "@/data/teachers";
import { useCountUp } from "@/hooks/useCountUp";

const themeGradients: Record<Teacher["avatarTheme"], string> = {
  hommes: "linear-gradient(135deg, var(--desert-horizon) 0%, var(--desert-nuit) 100%)",
  femmes: "linear-gradient(135deg, var(--andalou-ivoire) 0%, var(--andalou-rose) 100%)",
  coranique: "linear-gradient(135deg, var(--magie-indigo) 0%, var(--magie-marine) 100%)",
};

type TeacherModalProps = {
  teacher: Teacher | null;
  onClose: () => void;
};

export default function TeacherModal({ teacher, onClose }: TeacherModalProps) {
  const { count: countStudents, ref: refStudents } = useCountUp(teacher?.students ?? 0, 1500, {
    enabled: !!teacher,
  });

  useEffect(() => {
    if (!teacher) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEscape);
    };
  }, [teacher, onClose]);

  return (
    <AnimatePresence>
      {teacher && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 flex items-center justify-center overflow-hidden md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[90vh] md:w-full md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <div
              className="flex max-h-full w-full flex-col overflow-y-auto rounded-2xl border-2 bg-[var(--blanc-ivoire)]"
              style={{ borderColor: "var(--or-brillant)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative shrink-0 p-6 md:p-8"
                style={{ background: themeGradients[teacher.avatarTheme] }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white transition-opacity hover:bg-black/30"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-6">
                  <div
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 text-3xl font-semibold"
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.25)",
                      borderColor: "var(--or-brillant)",
                      color: "var(--blanc-ivoire)",
                    }}
                  >
                    {teacher.avatarInitials}
                  </div>
                  <div>
                    <p className="font-display text-2xl text-white">{teacher.name}</p>
                    <p className="font-arabic text-lg text-white/90">{teacher.nameAr}</p>
                    <p className="mt-1 text-sm italic text-white/80">{teacher.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div
                  className="rounded-xl border-2 p-6 text-center"
                  style={{
                    backgroundColor: "var(--beige-chaud)",
                    borderColor: "var(--or-brillant)",
                  }}
                >
                  <p className="font-arabic text-2xl md:text-3xl" style={{ color: "var(--or-luxe)" }}>
                    {teacher.quote}
                  </p>
                  <p className="mt-2 font-body italic" style={{ color: "var(--encre-douce)" }}>
                    {teacher.quoteTranslation}
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-lg font-semibold" style={{ color: "var(--encre-noire)" }}>
                    Biographie
                  </h4>
                  <p className="mt-2 text-justify font-body leading-relaxed" style={{ color: "var(--encre-douce)" }}>
                    {teacher.bio}
                  </p>
                  {teacher.bioAr && (
                    <p
                      dir="rtl"
                      className="mt-4 text-right font-arabic text-lg leading-relaxed"
                      style={{ color: "var(--or-luxe)" }}
                    >
                      {teacher.bioAr}
                    </p>
                  )}
                </div>

                {teacher.youtubeId && (
                  <div>
                    <h4 className="font-display text-lg font-semibold" style={{ color: "var(--encre-noire)" }}>
                      🎥 Présentation vidéo
                    </h4>
                    <div className="mt-3 aspect-video overflow-hidden rounded-xl bg-[var(--encre-noire)]">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${teacher.youtubeId}`}
                        title={`Présentation ${teacher.name}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border-2 p-4" style={{ borderColor: "var(--or-brillant)" }}>
                    <p className="text-xs font-semibold uppercase" style={{ color: "var(--or-luxe)" }}>
                      Niveaux
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {teacher.specialites.niveaux.map((n) => (
                        <span
                          key={n}
                          className="rounded px-2 py-0.5 text-sm"
                          style={{
                            backgroundColor: "var(--beige-chaud)",
                            color: "var(--encre-noire)",
                          }}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border-2 p-4" style={{ borderColor: "var(--or-brillant)" }}>
                    <p className="text-xs font-semibold uppercase" style={{ color: "var(--or-luxe)" }}>
                      Univers
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {teacher.specialites.univers.map((u) => (
                        <span
                          key={u}
                          className="rounded px-2 py-0.5 text-sm"
                          style={{
                            backgroundColor: "var(--beige-chaud)",
                            color: "var(--encre-noire)",
                          }}
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border-2 p-4" style={{ borderColor: "var(--or-brillant)" }}>
                    <p className="text-xs font-semibold uppercase" style={{ color: "var(--or-luxe)" }}>
                      Matières
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {teacher.specialites.matieres.map((m) => (
                        <span
                          key={m}
                          className="rounded px-2 py-0.5 text-sm"
                          style={{
                            backgroundColor: "var(--beige-chaud)",
                            color: "var(--encre-noire)",
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-xl border-2 p-4"
                  style={{
                    backgroundColor: "var(--beige-chaud)",
                    borderColor: "var(--or-brillant)",
                  }}
                >
                  <h4 className="flex items-center gap-2 font-display text-lg font-semibold" style={{ color: "var(--encre-noire)" }}>
                    <Award className="h-5 w-5" style={{ color: "var(--or-luxe)" }} />
                    Diplômes & certifications
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {teacher.diplomes.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm" style={{ color: "var(--encre-douce)" }}>
                        <span style={{ color: "var(--or-luxe)" }}>•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--or-brillant)" }}>
                  <div ref={refStudents} className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: "var(--or-brillant)" }}>
                        {countStudents}+
                      </p>
                      <p className="text-xs" style={{ color: "var(--encre-douce)" }}>
                        élèves formés
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: "var(--or-brillant)" }}>
                        {teacher.experience}
                      </p>
                      <p className="text-xs" style={{ color: "var(--encre-douce)" }}>
                        d&apos;expérience
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/tarifs?professeur=${teacher.id}`}
                    className="rounded-full bg-[var(--or-luxe)] px-6 py-3 font-display font-medium text-[var(--encre-noire)] transition-opacity hover:opacity-90"
                  >
                    Réserver un cours avec {teacher.name.split(" ")[0]}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
