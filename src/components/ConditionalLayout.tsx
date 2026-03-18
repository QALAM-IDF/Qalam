"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/PageTransition";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHidden =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/professeur") ||
    pathname?.startsWith("/espace-membre") ||
    pathname === "/connexion" ||
    pathname === "/inscription" ||
    pathname === "/auth-redirect" ||
    pathname === "/choisir-espace" ||
    pathname === "/choisir-forfait" ||
    pathname === "/paiement-succes" ||
    pathname === "/abonnement-expire";

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
