import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours d'arabe pour Enfants",
  description:
    "Cours d'arabe ludiques pour enfants. Tous niveaux, du débutant au Coran. Forfaits à partir de 120€.",
  openGraph: {
    title: "Cours d'arabe pour Enfants — Qalam",
    images: [{ url: "/images/og-enfants.jpg" }],
  },
};

export default function EnfantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
