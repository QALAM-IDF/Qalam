import Link from "next/link";
import Hero from "@/components/home/Hero";
import PortalsSection from "@/components/home/PortalsSection";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import CourseCard from "@/components/ui/CourseCard";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { client, hasSanityConfig } from "@/sanity/lib/client";
import { featuredPostsQuery } from "@/sanity/lib/queries";
import ArticleCard from "@/components/blog/ArticleCard";
import type { SanityPostListItem } from "@/types/sanity";

const levels = [
  {
    level: "Debutant",
    levelAr: "مبتدئ",
    description: "Alphabet, sons fondamentaux et premieres lectures guidees.",
    duration: "8 semaines",
  },
  {
    level: "Intermediaire",
    levelAr: "متوسط",
    description: "Conversation, grammaire active et comprehension orale.",
    duration: "10 semaines",
  },
  {
    level: "Avance",
    levelAr: "متقدم",
    description: "Litterature, argumentation et expression ecrite structuree.",
    duration: "12 semaines",
  },
  {
    level: "Coranique / Tajwid",
    levelAr: "تجويد",
    description: "Recitation, makharij et regles de tajwid avec rigueur.",
    duration: "continu",
  },
];

export default async function Home() {
  const featured = hasSanityConfig
    ? (await client.fetch<SanityPostListItem[]>(featuredPostsQuery).catch(() => []) ?? [])
    : [];

  return (
    <main className="overflow-hidden">
      <Hero />
      <PortalsSection />
      <WhyUs />
      <HowItWorks />

      <section className="grain-surface bg-[var(--beige-creme)] py-16 md:py-24">
        <div className="section-shell">
          <div className="text-center">
            <p className="font-arabic text-4xl text-[var(--or-luxe)]">المستويات</p>
            <h2 className="font-display text-5xl text-[var(--encre-noire)]">Les niveaux</h2>
            <div className="mx-auto mt-3 max-w-lg">
              <CalligraphyDivider />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {levels.map((item) => (
              <div key={item.level}>
                <CourseCard
                  level={item.level}
                  levelAr={item.levelAr}
                  description={item.description}
                  duration={item.duration}
                  theme="default"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="grain-surface bg-[var(--beige-creme)] py-16 md:py-24">
          <div className="section-shell">
            <div className="text-center">
              <p className="font-arabic text-4xl text-[var(--or-luxe)]">المدونة</p>
              <h2 className="font-display text-5xl text-[var(--encre-noire)] mt-2">
                Le Blog
              </h2>
              <div className="mx-auto mt-3 max-w-lg">
                <CalligraphyDivider />
              </div>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 font-display text-lg font-medium transition-opacity hover:opacity-90"
                style={{
                  borderColor: "var(--or-luxe)",
                  color: "var(--or-luxe)",
                }}
              >
                Voir tous les articles →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
