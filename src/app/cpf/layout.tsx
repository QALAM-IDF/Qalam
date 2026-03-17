import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations éligibles CPF — Arabe & Anglais",
  description:
    "Utilisez votre Compte Personnel de Formation pour apprendre l'arabe ou l'anglais avec Qalam. Formations certifiées, tous niveaux.",
  openGraph: {
    title: "Formations CPF — Qalam",
    description:
      "Formations linguistiques éligibles CPF. Arabe et Anglais, tous niveaux.",
  },
};

export default function CpfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
