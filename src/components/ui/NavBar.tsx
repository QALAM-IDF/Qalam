"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, UserButton } from "@clerk/nextjs";
import { QalamLogo } from "@/components/shared/QalamLogo";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/hommes", label: "Hommes" },
  { href: "/femmes", label: "Femmes" },
  { href: "/enfants", label: "Enfants" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/cpf", label: "CPF", labelAr: "التكوين", badge: true },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const accents: Record<string, string> = {
  "/": "var(--or-luxe)",
  "/hommes": "var(--desert-ambre)",
  "/femmes": "var(--andalou-bordeaux)",
  "/enfants": "var(--magie-turquoise)",
  "/tarifs": "var(--or-luxe)",
  "/cpf": "var(--or-luxe)",
  "/blog": "var(--or-luxe)",
  "/a-propos": "var(--or-luxe)",
  "/contact": "var(--or-luxe)",
};

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMobile(768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  const accent = useMemo(() => accents[pathname] ?? "var(--or-luxe)", [pathname]);

  const menuBg = useMemo(() => {
    if (pathname === "/hommes") return "bg-[#c2956c]/95"; // desert-sable
    if (pathname === "/femmes") return "bg-[#a67c52]/95"; // andalou-brique
    if (pathname === "/enfants") return "bg-[#1a3a6b]/95"; // magie-marine
    if (pathname === "/tarifs") return "bg-[#c9a96e]/95"; // beige-profond
    return "bg-[#c9a96e]/95";
  }, [pathname]);

  const isDarkPage = pathname === "/hommes" || pathname === "/enfants";

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#f5efe0d4] shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className={`flex items-center ${isMobile ? "absolute left-1/2 -translate-x-1/2" : ""}`}
          onClick={() => setOpen(false)}
          aria-label="Qalam — Retour à l'accueil"
        >
          <QalamLogo height={44} invert={isDarkPage} />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            const withBadge = "badge" in link && link.badge;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-xl transition-opacity hover:opacity-80 flex items-center gap-2"
                style={{ color: active ? accent : "var(--encre-douce)" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
                {withBadge && (
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--andalou-feuille)",
                      color: "var(--blanc-ivoire)",
                    }}
                  >
                    CPF
                  </span>
                )}
              </Link>
            );
          })}
          <Show when="signed-out">
            <Link
              href="/connexion"
              className="font-display text-xl transition-opacity hover:opacity-80"
              style={{ color: "var(--encre-douce)" }}
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="rounded-full border px-5 py-2 font-display text-sm font-medium transition-all hover:opacity-90"
              style={{
                borderColor: "var(--or-brillant)",
                color: "var(--or-brillant)",
              }}
            >
              Commencer
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/auth-redirect"
              className="rounded-full border px-5 py-2 font-display text-sm font-medium transition-all hover:opacity-90"
              style={{
                borderColor: "var(--or-brillant)",
                color: "var(--or-brillant)",
              }}
            >
              Mon espace
            </Link>
            <UserButton appearance={{ variables: { colorPrimary: "#b8860b" } }} />
          </Show>
        </div>

        <button
          className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#d4af3777] p-2 md:hidden ${
            isMobile ? "absolute right-4 top-1/2 -translate-y-1/2 z-[52]" : ""
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Navigation principale"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 top-0 z-[51] flex flex-col items-center justify-center gap-8 ${menuBg} backdrop-blur-sm md:hidden`}
            onClick={() => setOpen(false)}
          >
            <div
              className="flex flex-col items-center justify-center gap-8 py-20"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: 0.05 * idx, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-medium"
                    style={{
                      color: pathname === link.href ? accent : "#faf6ee",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Show when="signed-out">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.25 }}
                >
                  <Link
                    href="/connexion"
                    className="font-display text-3xl font-medium"
                    style={{ color: "#faf6ee" }}
                    onClick={() => setOpen(false)}
                  >
                    Connexion
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.25 }}
                >
                  <Link
                    href="/inscription"
                    className="inline-flex rounded-full border-2 px-6 py-3 font-display text-lg font-medium"
                    style={{ borderColor: "#faf6ee", color: "#faf6ee" }}
                    onClick={() => setOpen(false)}
                  >
                    Commencer
                  </Link>
                </motion.div>
              </Show>
              <Show when="signed-in">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.25 }}
                >
                  <Link
                    href="/auth-redirect"
                    className="inline-flex rounded-full border-2 px-6 py-3 font-display text-lg font-medium"
                    style={{ borderColor: "#faf6ee", color: "#faf6ee" }}
                    onClick={() => setOpen(false)}
                  >
                    Mon espace →
                  </Link>
                </motion.div>
                <div className="flex justify-center">
                  <UserButton
                    appearance={{ variables: { colorPrimary: "#b8860b" } }}
                  />
                </div>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
