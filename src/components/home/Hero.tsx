"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { QalamLogo } from "@/components/shared/QalamLogo";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { useMobile } from "@/hooks/useMobile";

const letters = ["ب", "ع", "ل", "م", "ن", "ح"];

export default function Hero() {
  const isMobile = useMobile(768);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const patternY = useTransform(scrollY, [0, 400], [0, 40]);

  const shouldParallax = !isMobile;

  return (
    <section className="grain-surface grain-overlay relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#e8d5b0] via-[#c9a96e] to-[#f5efe0] pb-20 pt-20 text-center md:pb-0">
      <motion.div
        className="pointer-events-none absolute inset-0 mx-auto h-full w-full"
        style={{ y: shouldParallax ? patternY : 0 }}
      >
        <ArabicPattern
          className="h-full w-full scale-[1.4]"
          opacity={0.08}
          color="var(--encre-douce)"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0">
        {(isMobile ? letters.slice(0, 6) : letters).map((letter, idx) => (
          <span
            key={`${letter}-${idx}`}
            className="font-arabic absolute text-4xl text-[#1a1208]"
            style={{
              left: `${12 + idx * 14}%`,
              top: `${18 + ((idx * 19) % 58)}%`,
              animation: `drift ${5 + idx}s ease-in-out infinite`,
              opacity: 0.07,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <motion.div
        className="section-shell relative z-10 px-6"
        initial="hidden"
        animate="show"
        style={{
          opacity: shouldParallax ? heroOpacity : 1,
          y: shouldParallax ? heroY : 0,
        }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mx-auto mb-6"
        >
          <QalamLogo height={90} className="mx-auto" />
        </motion.div>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-6 text-lg text-[#3d2b1f]"
        >
          Apprends l&apos;arabe. Entre dans un monde.
        </motion.p>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-2 font-arabic text-2xl text-[#5d4124]"
        >
          تعلم العربية. ادخل عالما جديدا.
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="mx-auto mt-4 max-w-xl"
        >
          <CalligraphyDivider />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <a
            href="#portails"
            className="mt-8 inline-flex w-full min-h-[48px] items-center justify-center rounded-full border border-[#b8860b] bg-[#c9a96e] px-8 py-4 text-sm tracking-wide text-[#1a1208] transition-colors hover:bg-[#d4af37] md:w-auto"
          >
            Choisir mon univers ↓
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
