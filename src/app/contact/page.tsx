import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Globe, Clock } from "lucide-react";
import ArabicPattern from "@/components/shared/ArabicPattern";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Qalam",
  description:
    "Contactez l'équipe Qalam pour toute question sur nos formations d'arabe. Réponse sous 24h.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section
        className="relative pt-32 pb-16 text-center grain-overlay overflow-hidden"
        style={{ background: "var(--beige-creme)" }}
      >
        <ArabicPattern opacity={0.06} size={500} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            className="font-arabic text-3xl mb-2"
            style={{ color: "var(--or-luxe)" }}
          >
            تواصل معنا
          </p>
          <h1
            className="font-display text-5xl mb-4"
            style={{ color: "var(--encre-noire)" }}
          >
            Contactez-nous
          </h1>
          <p
            className="font-body text-lg max-w-xl mx-auto"
            style={{ color: "var(--encre-douce)" }}
          >
            Une question sur nos formations ? Besoin d&apos;un renseignement ?
            Notre équipe vous répond sous 24h.
          </p>
          <CalligraphyDivider className="mx-auto mt-6 w-48" />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2
              className="font-display text-3xl mb-8"
              style={{ color: "var(--encre-noire)" }}
            >
              Nos coordonnées
            </h2>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--or-brillant)" }}
              >
                <Mail size={18} style={{ color: "var(--encre-noire)" }} />
              </div>
              <div>
                <p
                  className="font-display text-lg mb-1"
                  style={{ color: "var(--encre-noire)" }}
                >
                  Email
                </p>
                <a
                  href="mailto:contact@qalam.academy"
                  className="font-body"
                  style={{ color: "var(--or-luxe)" }}
                >
                  contact@qalam.academy
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--or-brillant)" }}
              >
                <Globe size={18} style={{ color: "var(--encre-noire)" }} />
              </div>
              <div>
                <p
                  className="font-display text-lg mb-1"
                  style={{ color: "var(--encre-noire)" }}
                >
                  Réseaux sociaux
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "var(--encre-douce)" }}
                >
                  Bientôt disponibles — Instagram, YouTube
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--or-brillant)" }}
              >
                <Clock size={18} style={{ color: "var(--encre-noire)" }} />
              </div>
              <div>
                <p
                  className="font-display text-lg mb-1"
                  style={{ color: "var(--encre-noire)" }}
                >
                  Disponibilité
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "var(--encre-douce)" }}
                >
                  Lundi – Vendredi : 9h – 18h
                  <br />
                  Réponse sous 24h ouvrées
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-5 mt-4"
              style={{
                background: "var(--beige-chaud)",
                border: "1px solid var(--or-brillant)",
              }}
            >
              <p
                className="font-display text-lg mb-1"
                style={{ color: "var(--encre-noire)" }}
              >
                💡 Question sur le CPF ?
              </p>
              <p
                className="font-body text-sm mb-3"
                style={{ color: "var(--encre-douce)" }}
              >
                Nos formations sont éligibles au Compte Personnel de Formation.
                Consultez notre page dédiée pour en savoir plus.
              </p>
              <Link
                href="/cpf"
                className="font-body text-sm font-bold"
                style={{ color: "var(--or-luxe)" }}
              >
                Voir les formations CPF →
              </Link>
            </div>
          </div>

          <div>
            <h2
              className="font-display text-3xl mb-8"
              style={{ color: "var(--encre-noire)" }}
            >
              Envoyer un message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
