"use client";

import Link from "next/link";
import { Compass, Flower2, MoonStar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import type { ComponentType } from "react";

type Theme = "hommes" | "femmes" | "enfants";

type PortalCardProps = {
  title_ar: string;
  title_fr: string;
  description: string;
  href: string;
  theme: Theme;
};

const themeConfig: Record<
  Theme,
  {
    gradient: string;
    accent: string;
    cta: string;
    icon: ComponentType<{ className?: string }>;
    overlay: string;
  }
> = {
  hommes: {
    gradient: "linear-gradient(150deg, #c2956c 0%, #8b5e3c 52%, #1a0e00 100%)",
    accent: "#c17f24",
    cta: "Entrer dans le monde des hommes",
    icon: Compass,
    overlay:
      "radial-gradient(circle at 20% 80%, rgba(255,215,160,.18), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,.14), transparent 40%)",
  },
  femmes: {
    gradient: "linear-gradient(150deg, #e8c4a0 0%, #a67c52 46%, #2d4a2d 100%)",
    accent: "#c4927a",
    cta: "Entrer dans le monde des femmes",
    icon: Flower2,
    overlay:
      "radial-gradient(circle at 15% 20%, rgba(255,235,220,.3), transparent 35%), radial-gradient(circle at 75% 80%, rgba(160,230,180,.2), transparent 42%)",
  },
  enfants: {
    gradient: "linear-gradient(160deg, #0d1b4b 0%, #1a3a6b 45%, #0a0a2e 100%)",
    accent: "#4ecdc4",
    cta: "Entrer dans le monde magique",
    icon: MoonStar,
    overlay:
      "radial-gradient(circle at 20% 18%, rgba(255,215,0,.2), transparent 36%), radial-gradient(circle at 76% 74%, rgba(78,205,196,.22), transparent 40%)",
  },
};

export default function PortalCard({
  title_ar,
  title_fr,
  description,
  href,
  theme,
}: PortalCardProps) {
  const config = themeConfig[theme];
  const Icon = config.icon;
  const isMobile = useMobile(768);
  const [panelOpen, setPanelOpen] = useState(false);

  const cardContent = (
    <div
      className="group relative h-full min-h-[280px] overflow-hidden rounded-2xl border-2 border-white/20 object-cover md:min-h-[32rem] md:rounded-3xl"
      style={{ backgroundImage: `${config.overlay}, ${config.gradient}` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {theme === "enfants" && (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(isMobile ? 6 : 18)].map((_, idx) => (
            <span
              key={idx}
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-200"
              style={{
                left: `${(idx * 37) % 100}%`,
                top: `${(idx * 53) % 100}%`,
                animation: `twinkle ${1.2 + (idx % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="text-center md:text-left">
            <p className="font-arabic text-4xl leading-none text-white md:text-5xl">{title_ar}</p>
            <p className="mt-2 font-display text-lg text-white md:text-3xl">{title_fr}</p>
          </div>
          <span
            className="rounded-full border p-2"
            style={{ borderColor: `${config.accent}aa`, backgroundColor: "#00000033" }}
          >
            <Icon className="h-5 w-5" />
          </span>
        </div>
        {!isMobile && (
          <div className="translate-y-3 opacity-85 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[32ch] text-sm leading-relaxed text-white/90">{description}</p>
            <Link
              href={href}
              aria-label={`Accéder aux cours ${title_fr}`}
              className="mt-5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/45 px-4 py-2 text-sm transition-colors hover:bg-white/15"
            >
              {config.cta} <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="grain-overlay cursor-pointer"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          {cardContent}
        </motion.div>
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-b-2xl border-x-2 border-b-2 border-white/20 bg-black/40 px-5 py-4">
                <p className="text-sm leading-relaxed text-white/90">{description}</p>
                <Link
                  href={href}
                  aria-label={`Accéder aux cours ${title_fr}`}
                  className="mt-4 flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-5 py-3 text-sm text-white transition-colors active:bg-white/20"
                  onClick={() => setPanelOpen(false)}
                >
                  {config.cta} →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="grain-overlay"
    >
      {cardContent}
    </motion.div>
  );
}
