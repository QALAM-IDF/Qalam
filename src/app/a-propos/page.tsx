import type { Metadata } from "next";
import Link from "next/link";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import MissionBlock from "@/components/about/MissionBlock";
import ValueCards from "@/components/about/ValueCard";
import MethodeStep from "@/components/about/MethodeStep";
import TeachersSection from "@/components/about/TeachersSection";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez l'histoire de Qalam, notre mission, notre méthode pédagogique et nos professeurs natifs diplômés.",
  openGraph: {
    title: "À Propos de Qalam — École de langue arabe",
    description: "Notre mission, nos valeurs et nos professeurs.",
  },
};

export default function AProposPage() {
  return (
    <main id="main-content" className="overflow-hidden bg-[var(--beige-creme)] pt-20">
      {/* 1. Hero */}
      <section className="grain-overlay relative section-shell pt-16 pb-20">
        <ArabicPattern
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          color="var(--encre-douce)"
        />
        <div className="relative text-center">
          <p
            className="font-arabic text-4xl md:text-5xl"
            style={{ color: "var(--or-luxe)" }}
          >
            مَنْ نَحْنُ؟
          </p>
          <h1
            className="font-display text-5xl font-semibold mt-2"
            style={{ color: "var(--encre-noire)" }}
          >
            À Propos de Qalam
          </h1>
          <p
            className="mt-4 font-body text-lg"
            style={{ color: "var(--encre-douce)" }}
          >
            Une école, une plume, une mission.
          </p>
          <CalligraphyDivider className="mx-auto mt-6 w-48" />
        </div>
      </section>

      {/* 2. Mission & Histoire */}
      <section className="section-shell py-16 md:py-24">
        <MissionBlock />
      </section>

      {/* 3. Nos Valeurs */}
      <section className="section-shell py-16 md:py-24">
        <div className="text-center mb-12">
          <p
            className="font-arabic text-3xl md:text-4xl"
            style={{ color: "var(--or-luxe)" }}
          >
            قِيَمُنَا
          </p>
          <h2
            className="font-display text-4xl font-semibold mt-2"
            style={{ color: "var(--encre-noire)" }}
          >
            Nos Valeurs
          </h2>
          <CalligraphyDivider className="mx-auto mt-4 w-32" compact />
        </div>
        <ValueCards />
      </section>

      {/* 4. Notre Méthode */}
      <section className="section-shell py-16 md:py-24">
        <div className="text-center mb-12">
          <p
            className="font-arabic text-3xl md:text-4xl"
            style={{ color: "var(--or-luxe)" }}
          >
            مَنْهَجُنَا
          </p>
          <h2
            className="font-display text-4xl font-semibold mt-2"
            style={{ color: "var(--encre-noire)" }}
          >
            Notre Méthode
          </h2>
          <CalligraphyDivider className="mx-auto mt-4 w-32" compact />
        </div>
        <MethodeStep />
      </section>

      {/* 5. Nos Professeurs */}
      <section id="professeurs" className="section-shell py-16 md:py-24">
        <div className="text-center mb-12">
          <p
            className="font-arabic text-3xl md:text-4xl"
            style={{ color: "var(--or-luxe)" }}
          >
            أَسَاتِذَتُنَا
          </p>
          <h2
            className="font-display text-4xl font-semibold mt-2"
            style={{ color: "var(--encre-noire)" }}
          >
            Nos Professeurs
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto font-body text-lg"
            style={{ color: "var(--encre-douce)" }}
          >
            Des natifs diplômés, passionnés par la transmission
          </p>
          <CalligraphyDivider className="mx-auto mt-4 w-32" compact />
        </div>
        <TeachersSection />
      </section>

      {/* 6. CTA Final */}
      <section className="grain-overlay relative section-shell py-20 md:py-28 bg-[var(--encre-noire)]">
        <CalligraphyDivider className="mx-auto mb-10" color="var(--blanc-ivoire)" compact />
        <p
          className="font-arabic text-4xl md:text-5xl text-center"
          style={{ color: "var(--or-brillant)" }}
        >
          ابدأ رحلتك
        </p>
        <h2
          className="font-display text-4xl md:text-5xl font-semibold text-center mt-2"
          style={{ color: "var(--blanc-ivoire)" }}
        >
          Prêt à commencer ?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/tarifs"
            className="rounded-full border-2 px-8 py-3 font-display font-medium transition-opacity hover:opacity-90"
            style={{
              borderColor: "var(--or-brillant)",
              color: "var(--or-brillant)",
            }}
          >
            Voir nos forfaits
          </Link>
          <Link
            href="/inscription"
            className="rounded-full bg-[var(--or-brillant)] px-8 py-3 font-display font-medium text-[var(--encre-noire)] transition-opacity hover:opacity-90"
          >
            Réserver ma place
          </Link>
        </div>
      </section>
    </main>
  );
}
