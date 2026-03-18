"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QalamLogo } from "@/components/shared/QalamLogo";
import { LayoutDashboard, GraduationCap } from "lucide-react";

export function ChoisirEspaceClient() {
  const router = useRouter();

  const espaces = [
    {
      id: "admin",
      title: "Espace Admin",
      titleAr: "لوحة الإدارة",
      description: "Gérer les cours, élèves, paiements et messages.",
      icon: LayoutDashboard,
      href: "/admin",
      bg: "#111111",
      accent: "#d4af37",
      border: "#2a2a2a",
    },
    {
      id: "prof",
      title: "Espace Professeur",
      titleAr: "لوحة الأستاذ",
      description:
        "Voir mes élèves, mes cours, mon planning et envoyer des messages.",
      icon: GraduationCap,
      href: "/professeur",
      bg: "#0d150d",
      accent: "#4ade80",
      border: "#1a2a1a",
    },
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center grain-overlay px-4"
      style={{ background: "var(--beige-creme)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <QalamLogo height={56} className="mx-auto mb-4" />
        <p className="font-arabic text-2xl" style={{ color: "var(--or-luxe)" }}>
          اختر فضاءك
        </p>
        <h1
          className="font-display text-3xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Choisir votre espace
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        {espaces.map((espace, i) => {
          const Icon = espace.icon;
          return (
            <motion.button
              key={espace.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(espace.href)}
              style={{
                flex: 1,
                background: espace.bg,
                border: `1px solid ${espace.border}`,
                borderRadius: 16,
                padding: "32px 24px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: `${espace.accent}20`,
                  border: `1px solid ${espace.accent}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Icon size={24} style={{ color: espace.accent }} />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-amiri)",
                  fontSize: "1.1rem",
                  color: espace.accent,
                  marginBottom: 4,
                }}
              >
                {espace.titleAr}
              </p>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                {espace.title}
              </h2>

              <p
                style={{
                  color: "#888",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                }}
              >
                {espace.description}
              </p>

              <p
                style={{
                  color: espace.accent,
                  marginTop: 20,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Accéder →
              </p>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: 32,
          color: "var(--encre-douce)",
          fontSize: "0.875rem",
        }}
      >
        <a href="/" style={{ color: "var(--or-luxe)", textDecoration: "none" }}>
          ← Retour au site
        </a>
      </motion.p>
    </main>
  );
}

