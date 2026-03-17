"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PdfDownload from "./PdfDownload";

type VideoPlayerProps = {
  youtubeId: string;
  title: string;
  titleAr: string;
  duration: string;
  description: string;
  lessonNumber: number;
  totalLessons: number;
  pdfUrl?: string;
  onComplete?: () => void;
};

export default function VideoPlayer({
  youtubeId,
  title,
  titleAr,
  duration,
  description,
  lessonNumber,
  totalLessons,
  pdfUrl,
  onComplete,
}: VideoPlayerProps) {
  const [completed, setCompleted] = useState(false);

  const handleMarkComplete = () => {
    setCompleted(true);
    onComplete?.();
  };

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        backgroundColor: "var(--encre-noire)",
        boxShadow: "0 8px 32px -8px rgba(184, 134, 11, 0.3)",
      }}
    >
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          className="absolute inset-0 h-full w-full rounded-t-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-5">
        <p
          className="mb-1 text-sm"
          style={{ color: "var(--or-brillant)" }}
        >
          Leçon {lessonNumber} / {totalLessons} · {duration}
        </p>
        <p className="font-arabic text-xl" style={{ color: "var(--beige-creme)" }}>
          {titleAr}
        </p>
        <h2 className="font-display text-2xl" style={{ color: "var(--beige-creme)" }}>
          {title}
        </h2>
        <p className="mt-2 text-sm opacity-90" style={{ color: "var(--beige-creme)" }}>
          {description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PdfDownload pdfUrl={pdfUrl} lessonTitle={title} />
          <motion.button
            type="button"
            onClick={handleMarkComplete}
            disabled={completed}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ${
              completed ? "opacity-80" : ""
            }`}
            style={{
              backgroundColor: completed ? "var(--or-brillant)" : "var(--or-luxe)",
              color: "var(--encre-noire)",
            }}
            whileHover={!completed ? { scale: 1.02 } : undefined}
            whileTap={!completed ? { scale: 0.98 } : undefined}
          >
            {completed ? (
              <>
                <Check className="h-4 w-4" /> Marqué comme vu
              </>
            ) : (
              <>✓ Marquer comme vu</>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
