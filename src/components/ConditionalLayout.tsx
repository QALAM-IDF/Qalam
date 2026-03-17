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
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
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
