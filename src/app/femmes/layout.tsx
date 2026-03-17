import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours d'arabe pour Femmes",
  description:
    "Cours d'arabe en groupe et particuliers pour femmes. Tous niveaux, du débutant au Coran. Forfaits à partir de 120€.",
  openGraph: {
    title: "Cours d'arabe pour Femmes — Qalam",
    images: [{ url: "/images/og-femmes.jpg" }],
  },
};

export default function FemmesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
