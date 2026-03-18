"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forfaitsByCategorie, forfaits, type Forfait, type ForfaitCategorie } from "@/data/forfaits";
import { QalamLogo } from "@/components/shared/QalamLogo";
import { CPFButton } from "@/components/ui/CPFButton";
import { Check, Loader2, Plus, User } from "lucide-react";

type Step = "member" | "category" | "forfait" | "cpf";
type PaymentType = "unique" | "mensuel";

type FamilyMemberRow = {
  id: string;
  prenom: string;
  nom?: string | null;
  categorie: string;
  purchases?: Array<{ forfait: string; status: string }>;
};

const categoryLabels: Record<string, string> = {
  hommes: "Hommes",
  femmes: "Femmes",
  "enfant-5-8": "5-8 ans",
  "enfant-9-12": "9-12 ans",
  "enfant-13-15": "13-15 ans",
};

const adultCategories: ForfaitCategorie[] = ["hommes", "femmes"];
const childCategories: ForfaitCategorie[] = ["enfant-5-8", "enfant-9-12", "enfant-13-15"];

function FormatBadge({ format }: { format: Forfait["format"] }) {
  const config = {
    youtube: { label: "🎬 Vidéos YouTube", color: "#ff0000" },
    zoom: { label: "📹 Zoom en direct", color: "#2D8CFF" },
    "youtube-zoom": { label: "🎬 YouTube + 📹 Zoom", color: "#b8860b" },
  };
  const { label, color } = config[format];
  return (
    <span
      style={{
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: "0.75rem",
        background: `${color}15`,
        color,
        border: `1px solid ${color}40`,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

export default function ChoisirForfaitClient() {
  const [step, setStep] = useState<Step>("member");
  const [members, setMembers] = useState<FamilyMemberRow[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedCategorie, setSelectedCategorie] = useState<ForfaitCategorie | null>(null);
  const [type, setType] = useState<PaymentType>("unique");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  useEffect(() => {
    fetch("/api/famille")
      .then((r) => r.json())
      .then((d) => setMembers(d.members ?? []))
      .catch(() => setMembers([]));
  }, []);

  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  const isAdult = selectedCategorie && adultCategories.includes(selectedCategorie);
  const forfaitsForCategory = selectedCategorie
    ? selectedCategorie === "hommes"
      ? forfaitsByCategorie.hommes
      : selectedCategorie === "femmes"
        ? forfaitsByCategorie.femmes
        : childCategories.includes(selectedCategorie)
          ? forfaitsByCategorie.enfants
          : []
    : [];
  const list = forfaitsForCategory.filter((f) =>
    type === "unique" ? true : f.id.includes("essentiel") || f.id.includes("particulier")
  );

  const handleChoisir = async (forfaitId: string) => {
    setLoading(forfaitId);
    setError("");
    const forfait = forfaits.find((f) => f.id === forfaitId);
    const family_member_id = selectedMemberId || undefined;
    const categorie = forfait?.categorie ?? selectedCategorie ?? undefined;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forfait: forfaitId,
          type,
          family_member_id: family_member_id || undefined,
          categorie,
        }),
      });
      const data = await res.json();
      if (data.url) setRedirectUrl(data.url);
      else {
        setError("Erreur lors de la création du paiement. Réessayez.");
        setLoading(null);
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(null);
    }
  };

  const goCategory = (categorie: ForfaitCategorie) => {
    setSelectedCategorie(categorie);
    setStep("forfait");
  };

  return (
    <main
      className="min-h-screen grain-overlay"
      style={{ background: "var(--beige-creme)" }}
    >
      <div className="text-center pt-16 pb-8 px-4">
        <QalamLogo height={52} className="mx-auto mb-6" />
        <p className="font-arabic text-2xl mb-2" style={{ color: "var(--or-luxe)" }}>
          اختر باقتك
        </p>
        <h1 className="font-display text-4xl mb-2" style={{ color: "var(--encre-noire)" }}>
          Choisissez votre forfait
        </h1>
        <p className="font-body" style={{ color: "var(--encre-douce)" }}>
          {step === "member" && "Pour qui est ce forfait ?"}
          {step === "category" && "Choisissez la catégorie"}
          {step === "forfait" && "Choisissez votre forfait"}
          {step === "cpf" && "Financez avec le CPF"}
        </p>
      </div>

      <div className="flex justify-center mb-6 px-4 flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStep("cpf")}
          className="px-4 py-2 rounded-full font-body text-sm transition-all"
          style={{
            background: step === "cpf" ? "var(--or-brillant)" : "var(--beige-chaud)",
            color: step === "cpf" ? "var(--encre-noire)" : "var(--encre-douce)",
            fontWeight: step === "cpf" ? 700 : 400,
          }}
        >
          Financement CPF 🎓
        </button>
        {step !== "cpf" && (
          <button
            type="button"
            onClick={() => { setStep("member"); setSelectedMemberId(null); setSelectedCategorie(null); }}
            className="px-4 py-2 rounded-full font-body text-sm"
            style={{ background: "var(--beige-chaud)", color: "var(--encre-douce)" }}
          >
            ← Forfaits
          </button>
        )}
      </div>

      {error && (
        <p className="text-center mb-4 px-4" style={{ color: "var(--andalou-bordeaux)" }}>
          {error}
        </p>
      )}

      <AnimatePresence mode="wait">
        {step === "cpf" && (
          <motion.div
            key="cpf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-4 pb-20"
          >
            <div
              className="rounded-2xl p-8 text-center grain-overlay"
              style={{
                background: "var(--blanc-ivoire)",
                border: "2px solid var(--or-brillant)",
              }}
            >
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-6"
                style={{ background: "var(--or-brillant)", color: "var(--encre-noire)" }}
              >
                ✅ Éligible CPF
              </div>
              <p className="font-arabic text-3xl mb-2" style={{ color: "var(--or-luxe)" }}>
                التكوين المهني
              </p>
              <h2 className="font-display text-3xl mb-4" style={{ color: "var(--encre-noire)" }}>
                Financer votre formation avec le CPF
              </h2>
              <p className="font-body mb-6" style={{ color: "var(--encre-douce)" }}>
                Utilisez vos droits Compte Personnel de Formation pour accéder à nos formations d&apos;arabe certifiées.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div
                  className="rounded-xl p-5 text-left"
                  style={{ background: "var(--beige-chaud)", border: "1px solid var(--or-brillant)" }}
                >
                  <p className="font-arabic text-2xl mb-1" style={{ color: "var(--or-luxe)" }}>اللغة العربية</p>
                  <h3 className="font-display text-xl mb-2" style={{ color: "var(--encre-noire)" }}>Arabe</h3>
                  <p className="font-body text-sm mb-4" style={{ color: "var(--encre-douce)" }}>
                    Débutant → Avancé → Coranique. Modules certifiés.
                  </p>
                  <CPFButton
                    langue="arabe"
                    className="block w-full py-3 rounded-full text-center font-display transition-all"
                    style={{ background: "var(--or-brillant)", color: "var(--encre-noire)", fontWeight: 600 }}
                  >
                    S&apos;inscrire avec mon CPF →
                  </CPFButton>
                </div>
                <div
                  className="rounded-xl p-5 text-left"
                  style={{ background: "var(--magie-marine)", border: "1px solid var(--magie-turquoise)" }}
                >
                  <p className="font-arabic text-2xl mb-1" style={{ color: "var(--magie-turquoise)" }}>اللغة الإنجليزية</p>
                  <h3 className="font-display text-xl mb-2" style={{ color: "var(--magie-etoile)" }}>Anglais</h3>
                  <p className="font-body text-sm mb-4" style={{ color: "var(--magie-etoile)", opacity: 0.8 }}>
                    Débutant → Business.
                  </p>
                  <CPFButton
                    langue="anglais"
                    className="block w-full py-3 rounded-full text-center font-display transition-all"
                    style={{ background: "var(--magie-turquoise)", color: "var(--magie-indigo)", fontWeight: 600 }}
                  >
                    S&apos;inscrire avec mon CPF →
                  </CPFButton>
                </div>
              </div>
              <p className="font-body text-sm" style={{ color: "var(--encre-douce)" }}>
                Consultez votre solde sur{" "}
                <a href="https://www.moncompteformation.gouv.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--or-luxe)", textDecoration: "underline" }}>
                  moncompteformation.gouv.fr
                </a>
              </p>
            </div>
          </motion.div>
        )}

        {step === "member" && (
          <motion.div
            key="member"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-4 pb-20"
          >
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => { setSelectedMemberId(null); setStep("category"); setSelectedCategorie(null); }}
                className="flex items-center gap-3 rounded-2xl border-2 p-5 w-full sm:w-auto min-w-[200px] text-left transition-all hover:shadow-lg"
                style={{ borderColor: "var(--or-brillant)", background: "var(--blanc-ivoire)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--or-brillant)" }}>
                  <User className="w-6 h-6" style={{ color: "var(--encre-noire)" }} />
                </div>
                <div>
                  <span className="font-display text-lg block" style={{ color: "var(--encre-noire)" }}>Moi-même</span>
                  <span className="text-sm" style={{ color: "var(--encre-douce)" }}>Compte principal</span>
                </div>
              </button>
              {members.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setSelectedMemberId(m.id); setSelectedCategorie(m.categorie as ForfaitCategorie); setStep("forfait"); }}
                  className="flex items-center gap-3 rounded-2xl border-2 p-5 w-full sm:w-auto min-w-[200px] text-left transition-all hover:shadow-lg"
                  style={{ borderColor: "var(--beige-profond)", background: "var(--blanc-ivoire)" }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "var(--beige-chaud)", color: "var(--encre-noire)" }}>
                    {m.prenom[0]}{m.nom?.[0] ?? ""}
                  </div>
                  <div>
                    <span className="font-display text-lg block" style={{ color: "var(--encre-noire)" }}>{m.prenom} {m.nom ?? ""}</span>
                    <span className="text-sm" style={{ color: "var(--encre-douce)" }}>{categoryLabels[m.categorie] ?? m.categorie}</span>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAddMemberOpen(true)}
                className="flex items-center gap-3 rounded-2xl border-2 border-dashed p-5 w-full sm:w-auto min-w-[200px] text-left transition-all hover:border-[var(--or-luxe)]"
                style={{ borderColor: "var(--encre-douce)", background: "transparent" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--beige-chaud)" }}>
                  <Plus className="w-6 h-6" style={{ color: "var(--encre-douce)" }} />
                </div>
                <span className="font-display text-lg" style={{ color: "var(--encre-douce)" }}>Ajouter un membre</span>
              </button>
            </div>
            {addMemberOpen && (
              <AddMemberModal
                onClose={() => setAddMemberOpen(false)}
                onAdded={() => { setAddMemberOpen(false); fetch("/api/famille").then((r) => r.json()).then((d) => setMembers(d.members ?? [])); }}
              />
            )}
          </motion.div>
        )}

        {step === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-4 pb-20"
          >
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={() => setStep("member")}
                className="text-sm font-body"
                style={{ color: "var(--or-luxe)" }}
              >
                ← Retour (pour qui ?)
              </button>
            </div>
            <p className="text-center mb-4 font-body text-sm" style={{ color: "var(--encre-douce)" }}>
              Adulte (15 ans et +)
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {adultCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => goCategory(c)}
                  className="px-8 py-4 rounded-2xl font-display text-lg transition-all"
                  style={{
                    background: "var(--blanc-ivoire)",
                    border: "2px solid var(--or-brillant)",
                    color: "var(--encre-noire)",
                  }}
                >
                  {c === "hommes" ? "🏜️ Homme" : "🌸 Femme"}
                </button>
              ))}
            </div>
            <p className="text-center mb-4 font-body text-sm" style={{ color: "var(--encre-douce)" }}>
              Enfant
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {childCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => goCategory(c)}
                  className="px-6 py-3 rounded-2xl font-display transition-all"
                  style={{
                    background: "var(--blanc-ivoire)",
                    border: "2px solid var(--magie-turquoise)",
                    color: "var(--encre-noire)",
                  }}
                >
                  {categoryLabels[c]}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "forfait" && selectedCategorie && (
          <motion.div
            key="forfait"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 pb-20"
          >
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={() => setStep("category")}
                className="text-sm font-body"
                style={{ color: "var(--or-luxe)" }}
              >
                ← Retour à la catégorie
              </button>
            </div>
            {isAdult && (
              <div className="flex justify-center mb-6 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setType("unique")}
                  className="px-4 py-2 rounded-full font-body text-sm"
                  style={{
                    background: type === "unique" ? "var(--or-brillant)" : "var(--beige-chaud)",
                    color: type === "unique" ? "var(--encre-noire)" : "var(--encre-douce)",
                    fontWeight: type === "unique" ? 700 : 400,
                  }}
                >
                  Paiement unique
                </button>
                <button
                  type="button"
                  onClick={() => setType("mensuel")}
                  className="px-4 py-2 rounded-full font-body text-sm"
                  style={{
                    background: type === "mensuel" ? "var(--or-brillant)" : "var(--beige-chaud)",
                    color: type === "mensuel" ? "var(--encre-noire)" : "var(--encre-douce)",
                    fontWeight: type === "mensuel" ? 700 : 400,
                  }}
                >
                  Abonnement mensuel
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {list.map((forfait, i) => (
                <motion.div
                  key={forfait.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "var(--blanc-ivoire)",
                    border: forfait.highlighted ? "2px solid var(--or-brillant)" : "1px solid var(--beige-profond)",
                    borderRadius: 16,
                    padding: 28,
                    position: "relative",
                  }}
                >
                  {forfait.highlighted && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-body font-bold"
                      style={{ background: "var(--or-brillant)", color: "var(--encre-noire)" }}
                    >
                      ⭐ Le plus choisi
                    </div>
                  )}
                  <div className="mb-2">
                    <FormatBadge format={forfait.format} />
                    {forfait.cycleWeeks && (
                      <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--magie-turquoise)20", color: "var(--magie-turquoise)" }}>
                        {forfait.cycleWeeks} sem.
                      </span>
                    )}
                  </div>
                  <p className="font-arabic text-2xl mb-1" style={{ color: "var(--or-luxe)" }}>{forfait.nameAr}</p>
                  <h2 className="font-display text-2xl mb-1" style={{ color: "var(--encre-noire)" }}>{forfait.name}</h2>
                  <p className="font-body text-sm italic mb-4" style={{ color: "var(--encre-douce)" }}>{forfait.tagline}</p>
                  <div className="mb-4">
                    <span className="font-display text-5xl" style={{ color: "var(--encre-noire)" }}>{forfait.price}</span>
                    <span className="font-body text-xl ml-1" style={{ color: "var(--encre-douce)" }}>€{type === "mensuel" ? "/mois" : ""}</span>
                    <p className="font-body text-xs mt-1" style={{ color: "var(--encre-douce)" }}>
                      {type === "unique" ? forfait.priceLabel ?? "paiement unique" : "Sans engagement"}
                    </p>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {forfait.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-body text-sm" style={{ color: "var(--encre-douce)" }}>
                        <Check size={14} style={{ color: "var(--or-luxe)", marginTop: 3, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleChoisir(forfait.id)}
                    disabled={loading === forfait.id}
                    className="w-full py-3 rounded-full font-display text-base transition-all flex items-center justify-center gap-2"
                    style={{
                      background: forfait.highlighted ? "var(--or-brillant)" : "var(--encre-noire)",
                      color: forfait.highlighted ? "var(--encre-noire)" : "var(--or-brillant)",
                      opacity: loading === forfait.id ? 0.7 : 1,
                      cursor: loading === forfait.id ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading === forfait.id ? (
                      <><Loader2 size={16} className="animate-spin" /> Redirection...</>
                    ) : (
                      "Choisir ce forfait →"
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
            <p className="text-center font-body text-sm mt-8" style={{ color: "var(--encre-douce)" }}>
              Paiement 100% sécurisé via Stripe.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function AddMemberModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState<"homme" | "femme" | "enfant-5-8" | "enfant-9-12" | "enfant-13-15">("enfant-5-8");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom.trim()) { setErr("Prénom requis"); return; }
    setSubmitting(true);
    setErr("");
    try {
      const res = await fetch("/api/famille", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: prenom.trim(), nom: nom.trim() || undefined, categorie }),
      });
      const data = await res.json();
      if (data.member) onAdded();
      else setErr(data.error ?? "Erreur");
    } catch {
      setErr("Erreur réseau");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: "var(--blanc-ivoire)" }} onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-xl mb-4" style={{ color: "var(--encre-noire)" }}>Ajouter un membre</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--encre-douce)" }}>Prénom *</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--beige-profond)" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--encre-douce)" }}>Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--beige-profond)" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--encre-douce)" }}>Catégorie</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value as typeof categorie)}
              className="w-full rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--beige-profond)" }}
            >
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="enfant-5-8">Enfant 5-8 ans</option>
              <option value="enfant-9-12">Enfant 9-12 ans</option>
              <option value="enfant-13-15">Enfant 13-15 ans</option>
            </select>
          </div>
          {err && <p className="text-sm" style={{ color: "var(--andalou-bordeaux)" }}>{err}</p>}
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full font-body" style={{ background: "var(--beige-chaud)", color: "var(--encre-douce)" }}>
              Annuler
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-full font-display font-semibold" style={{ background: "var(--or-brillant)", color: "var(--encre-noire)" }}>
              {submitting ? "Ajout…" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
