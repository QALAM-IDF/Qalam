"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QalamLogo } from "@/components/shared/QalamLogo";
import ArabicPattern from "@/components/shared/ArabicPattern";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer
      role="contentinfo"
      id="contact"
      className="relative overflow-hidden border-t border-[#d4af3766] bg-[var(--blanc-ivoire)] grain-surface"
    >
      <ArabicPattern
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2"
        opacity={0.18}
        color="var(--or-luxe)"
      />
      <div className="section-shell flex flex-col items-center justify-center gap-6 py-14 text-center md:flex-row md:flex-wrap md:gap-5">
        <div className="mx-auto mb-4 flex flex-col items-center md:mb-0">
          <QalamLogo height={52} />
          <p
            className="font-arabic text-base mt-2 mb-1"
            style={{ color: "var(--or-luxe)" }}
          >
            العربية مفتاحُ عالمٍ جديد
          </p>
          <p
            className="font-body text-sm italic"
            style={{ color: "var(--encre-douce)" }}
          >
            L&apos;arabe, la clé d&apos;un nouveau monde.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-5">
          <Link href="/" className="text-sm text-[var(--encre-douce)]">Accueil</Link>
          <Link href="/hommes" className="text-sm text-[var(--encre-douce)]">Cours Hommes</Link>
          <Link href="/femmes" className="text-sm text-[var(--encre-douce)]">Cours Femmes</Link>
          <Link href="/enfants" className="text-sm text-[var(--encre-douce)]">Cours Enfants</Link>
          <Link href="/a-propos" className="text-sm text-[var(--encre-douce)]">À propos</Link>
          <Link href="/cpf" className="text-sm text-[var(--encre-douce)]">Formations CPF</Link>
        </div>
        <p className="text-sm text-[var(--encre-douce)]">contact@qalam.academy</p>
        <p className="text-xs text-[var(--encre-douce)]">
          © {new Date().getFullYear()} Qalam — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
