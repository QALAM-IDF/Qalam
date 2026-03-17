export const dynamic = "force-dynamic";

import { Users, CreditCard, Mail, BookOpen, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

async function getStats() {
  await requireAdmin();
  const supabase = createSupabaseAdmin();

  const [
    { count: totalEleves },
    { count: totalActifs },
    { data: purchases },
    { count: totalMessages },
    { count: totalCours },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("purchases")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("purchases")
      .select("forfait, type")
      .eq("status", "active"),
    supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
    supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
  ]);

  const prix: Record<string, number> = {
    decouverte: 120,
    essentiel: 299,
    intensif: 490,
  };
  const revenus = (purchases ?? []).reduce((acc, p) => {
    if (p.type === "unique")
      return acc + (prix[p.forfait as keyof typeof prix] ?? 0);
    if (p.forfait === "essentiel") return acc + 49;
    if (p.forfait === "intensif") return acc + 79;
    return acc;
  }, 0);

  return {
    totalEleves: totalEleves ?? 0,
    totalActifs: totalActifs ?? 0,
    revenus,
    messagesNonLus: totalMessages ?? 0,
    totalCours: totalCours ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1
        className="font-display text-3xl font-semibold"
        style={{ color: "#fff" }}
      >
        Dashboard
      </h1>
      <p className="mt-1 text-sm" style={{ color: "#888" }}>
        Vue d&apos;ensemble de l&apos;activité
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Total élèves inscrits"
          value={stats.totalEleves}
          icon={Users}
        />
        <StatCard
          label="Abonnements actifs"
          value={stats.totalActifs}
          icon={TrendingUp}
        />
        <StatCard
          label="Revenus estimés (€)"
          value={stats.revenus}
          icon={CreditCard}
          color="var(--or-brillant)"
        />
        <StatCard
          label="Messages non lus"
          value={stats.messagesNonLus}
          icon={Mail}
        />
        <StatCard
          label="Cours publiés"
          value={stats.totalCours}
          icon={BookOpen}
        />
      </div>
    </div>
  );
}
