import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours d'arabe pour Hommes",
  description:
    "Cours d'arabe en groupe et particuliers pour hommes. Tous niveaux, du débutant au Coran. Forfaits à partir de 120€.",
  openGraph: {
    title: "Cours d'arabe pour Hommes — Qalam",
    images: [{ url: "/images/og-hommes.jpg" }],
  },
};

export default function HommesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
