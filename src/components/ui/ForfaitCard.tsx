"use client";

import { motion } from "framer-motion";
import { Clock, User, Users, Video, Calendar, Check } from "lucide-react";
import type { Forfait } from "@/data/forfaits";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { useMobile } from "@/hooks/useMobile";

type ForfaitCardProps = {
  forfait: Forfait;
  theme?: "default" | "hommes" | "femmes" | "enfants";
  onSelect?: () => void;
  compact?: boolean;
};

const themeStyles: Record<
  NonNullable<ForfaitCardProps["theme"]>,
  { bg: string; border: string; accent: string; accentText: string; badge: string }
> = {
  default: {
    bg: "var(--blanc-ivoire)",
    border: "var(--or-brillant)",
    accent: "var(--or-luxe)",
    accentText: "var(--or-luxe)",
    badge: "var(--or-brillant)",
  },
  hommes: {
    bg: "var(--desert-horizon)",
    border: "var(--desert-ambre)",
    accent: "var(--desert-ambre)",
    accentText: "var(--desert-etoile)",
    badge: "var(--desert-ambre)",
  },
  femmes: {
    bg: "var(--andalou-ivoire)",
    border: "var(--andalou-brique)",
    accent: "var(--andalou-bordeaux)",
    accentText: "var(--andalou-bordeaux)",
    badge: "var(--andalou-brique)",
  },
  enfants: {
    bg: "var(--magie-marine)",
    border: "var(--magie-or)",
    accent: "var(--magie-turquoise)",
    accentText: "var(--magie-or)",
    badge: "var(--magie-or)",
  },
};

export default function ForfaitCard({ forfait, theme = "default", onSelect, compact = false }: ForfaitCardProps) {
  const isMobile = useMobile(768);
  const styles = themeStyles[theme];
  const isIndividuel = forfait.groupSize.toLowerCase().includes("individuel");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      animate={{ scale: forfait.highlighted ? (isMobile ? 1.01 : 1.03) : 1 }}
      className={`relative w-full overflow-hidden border-2 ${compact ? "rounded-[14px] p-5 md:p-5" : "rounded-2xl p-6 md:rounded-3xl"}`}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        boxShadow: forfait.highlighted ? "0 20px 40px -16px rgba(0,0,0,0.12)" : undefined,
      }}
    >
      {forfait.highlighted && (
        <div
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: styles.badge, color: "var(--encre-noire)" }}
        >
          ⭐ Le plus choisi
        </div>
      )}

      <header className={compact ? "mb-3" : "mb-4"}>
        <p className={`font-arabic leading-none ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`} style={{ color: styles.accentText }}>
          {forfait.nameAr}
        </p>
        <h3 className={`mt-1 font-display ${compact ? "text-xl" : "text-2xl"}`} style={{ color: styles.accentText }}>
          {forfait.name}
        </h3>
        <p className="mt-1 text-sm italic opacity-90" style={{ color: styles.accentText }}>
          {forfait.tagline}
        </p>
      </header>

      <div className={compact ? "mb-3" : "mb-4"} style={{ color: styles.accentText }}>
        <span className={`font-display font-semibold ${compact ? "text-4xl" : "text-5xl"}`}>{forfait.price}</span>
        <span className={compact ? "text-xl" : "text-2xl"}>€</span>
        {forfait.priceLabel && (
          <p className="mt-0.5 text-sm opacity-90">{forfait.priceLabel}</p>
        )}
      </div>

      <CalligraphyDivider
        className={`w-full min-w-[120px] ${compact ? "mb-3 h-4" : "mb-4 h-5"}`}
        color={styles.accent}
        compact
      />

      <ul className={`space-y-1.5 text-sm ${compact ? "mb-4" : "mb-6 space-y-2"}`} style={{ color: styles.accentText }}>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" style={{ color: styles.accent }} />
          <span>{forfait.hours}h de cours</span>
        </li>
        <li className="flex items-center gap-2">
          {isIndividuel ? (
            <User className="h-4 w-4 shrink-0" style={{ color: styles.accent }} />
          ) : (
            <Users className="h-4 w-4 shrink-0" style={{ color: styles.accent }} />
          )}
          <span>{forfait.groupSize}</span>
        </li>
        <li className="flex items-center gap-2">
          <Video className="h-4 w-4 shrink-0" style={{ color: styles.accent }} />
          <span>{forfait.format === "youtube" ? "Vidéos en ligne" : forfait.format === "zoom" ? "Cours en direct" : "YouTube + Zoom"}</span>
        </li>
        <li className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" style={{ color: styles.accent }} />
          <span>{forfait.sessionsPerWeek} séance(s)/semaine · {forfait.sessionDuration}</span>
        </li>
      </ul>

      <ul className={`space-y-1.5 text-sm ${compact ? "mb-4" : "mb-6 space-y-2"}`} style={{ color: styles.accentText }}>
        {forfait.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: styles.accent }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${compact ? "py-3" : "py-3"}`}
        style={{ backgroundColor: styles.accent, color: theme === "hommes" || theme === "enfants" ? "var(--encre-noire)" : "var(--blanc-ivoire)" }}
      >
        Je m&apos;inscris
      </button>
    </motion.article>
  );
}
