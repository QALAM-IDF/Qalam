import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs et Forfaits",
  description:
    "Découvrez nos forfaits cours d'arabe : Découverte, Essentiel, Intensif. Paiement unique ou abonnement mensuel.",
  openGraph: {
    title: "Tarifs — Qalam",
    images: [{ url: "/images/og-tarifs.jpg" }],
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
