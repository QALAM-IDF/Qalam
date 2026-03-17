"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/data/mock-courses";

type QuizBlockProps = {
  questions: QuizQuestion[];
  nextLessonHref?: string;
  onComplete?: (score: number) => void;
};

const scoreMessages: Record<string, string> = {
  excellent: "ممتاز!",
  good: "أحسنت!",
  retry: "حاول مرة أخرى",
};

export default function QuizBlock({
  questions,
  nextLessonHref,
  onComplete,
}: QuizBlockProps) {
  const [step, setStep] = useState<"idle" | "answering" | "revealed" | "completed">("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (idx: number) => {
    if (step !== "answering" || revealed) return;
    setSelectedIndex(idx);
  };

  const handleValidate = () => {
    if (selectedIndex === null) return;
    setRevealed(true);
    if (selectedIndex === question!.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
    setStep("revealed");
  };

  const handleNext = () => {
    if (isLast) {
      setStep("completed");
      onComplete?.(correctCount + (selectedIndex === question!.correctIndex ? 1 : 0));
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setRevealed(false);
      setStep("answering");
    }
  };

  const handleStart = () => {
    setStep("answering");
  };

  if (questions.length === 0) return null;

  const score = correctCount;
  const total = questions.length;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div
      className="overflow-hidden rounded-xl border p-6"
      style={{
        backgroundColor: "var(--blanc-ivoire)",
        borderColor: "var(--or-brillant)",
      }}
    >
      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h3 className="font-display text-xl" style={{ color: "var(--encre-noire)" }}>
              📝 Quiz de révision
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--encre-douce)" }}>
              {questions.length} question{questions.length > 1 ? "s" : ""}
            </p>
            <motion.button
              type="button"
              onClick={handleStart}
              className="mt-4 rounded-xl px-6 py-2 font-medium"
              style={{
                backgroundColor: "var(--or-brillant)",
                color: "var(--encre-noire)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Commencer
            </motion.button>
          </motion.div>
        )}

        {(step === "answering" || step === "revealed") && question && (
          <motion.div
            key={`q-${currentIndex}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display text-lg" style={{ color: "var(--encre-noire)" }}>
              {question.question}
            </h3>
            {question.questionAr && (
              <p className="font-arabic mt-1 text-lg" style={{ color: "var(--or-luxe)" }}>
                {question.questionAr}
              </p>
            )}
            <div className="mt-4 space-y-2">
              {question.options.map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = idx === question.correctIndex;
                const showResult = step === "revealed";
                const userRight = showResult && isSelected && isCorrect;
                const userWrong = showResult && isSelected && !isCorrect;
                const showCorrect = showResult && !isSelected && isCorrect;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                      showResult ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{
                      borderColor: userRight
                        ? "var(--green-600)"
                        : userWrong
                          ? "var(--red-600)"
                          : showCorrect
                            ? "var(--green-600)"
                            : "var(--beige-profond)",
                      backgroundColor: userRight
                        ? "rgba(34, 197, 94, 0.15)"
                        : userWrong
                          ? "rgba(220, 38, 38, 0.1)"
                          : showCorrect
                            ? "rgba(34, 197, 94, 0.15)"
                            : isSelected
                              ? "rgba(212, 175, 55, 0.2)"
                              : "transparent",
                    }}
                  >
                    {showResult && (userRight || showCorrect) && (
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                    )}
                    {showResult && userWrong && <X className="h-5 w-5 shrink-0 text-red-600" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {step === "revealed" && (
              <div
                className="mt-4 rounded-lg p-3 text-sm"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                  color: "var(--encre-douce)",
                }}
              >
                {question.explanation}
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              {step === "answering" && (
                <motion.button
                  type="button"
                  onClick={handleValidate}
                  disabled={selectedIndex === null}
                  className="rounded-xl px-5 py-2 font-medium disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                  whileHover={{ scale: selectedIndex !== null ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Valider
                </motion.button>
              )}
              {step === "revealed" && (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl px-5 py-2 font-medium"
                  style={{
                    backgroundColor: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLast ? "Voir mes résultats" : "Question suivante"}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {step === "completed" && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="font-arabic text-3xl" style={{ color: "var(--or-brillant)" }}>
              {percent >= 100 ? scoreMessages.excellent : percent >= 70 ? scoreMessages.good : scoreMessages.retry}
            </p>
            <p className="mt-2 font-display text-xl" style={{ color: "var(--encre-noire)" }}>
              {correctCount} / {total} réponses correctes
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <motion.button
                type="button"
                onClick={() => {
                  setStep("idle");
                  setCurrentIndex(0);
                  setSelectedIndex(null);
                  setCorrectCount(0);
                  setRevealed(false);
                }}
                className="rounded-xl border px-5 py-2 font-medium"
                style={{
                  borderColor: "var(--or-brillant)",
                  color: "var(--or-brillant)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Rejouer le quiz
              </motion.button>
              {nextLessonHref && (
                <Link
                  href={nextLessonHref}
                  className="inline-flex rounded-xl px-5 py-2 font-medium"
                  style={{
                    backgroundColor: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                >
                  Leçon suivante →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
