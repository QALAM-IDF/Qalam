export const dynamic = "force-dynamic";

import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { requireProf } from "@/lib/prof";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ProfDashboardClient } from "./ProfDashboardClient";

async function getDashboardData() {
  await requireProf();
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = createSupabaseAdmin();

  const { data: assignments } = await supabase
    .from("prof_eleves")
    .select("eleve_clerk_id")
    .eq("prof_clerk_id", userId);
  const eleveIds =
    assignments && assignments.length > 0
      ? assignments.map((a) => a.eleve_clerk_id)
      : (await supabase.from("profiles").select("clerk_user_id").eq("role", "eleve")).data?.map(
          (p) => p.clerk_user_id
        ) ?? [];

  const { data: profProfile } = await supabase
    .from("profiles")
    .select("specialites")
    .eq("clerk_user_id", userId)
    .maybeSingle();
  const specialites = (profProfile?.specialites as string[] | null) ?? [];
  const universFilter =
    specialites.length > 0 ? specialites : ["hommes", "femmes", "enfants", "mixte"];

  const { count: coursCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("published", true)
    .in("univers", universFilter);

  const { data: nextSessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("prof_clerk_id", userId)
    .gte("session_date", new Date().toISOString())
    .order("session_date", { ascending: true })
    .limit(3);

  const { data: allLessons } = await supabase.from("lessons").select("id");
  const totalLessons = allLessons?.length ?? 0;
  let progressionSum = 0;
  let progressionCount = 0;
  if (eleveIds.length > 0) {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("clerk_user_id, completed")
      .in("clerk_user_id", eleveIds);
    const byUser = (progress ?? []).reduce<Record<string, number>>((acc, p) => {
      if (!acc[p.clerk_user_id]) acc[p.clerk_user_id] = 0;
      if (p.completed) acc[p.clerk_user_id]++;
      return acc;
    }, {});
    Object.values(byUser).forEach((completed) => {
      progressionSum += totalLessons > 0 ? (100 * completed) / totalLessons : 0;
      progressionCount++;
    });
  }
  const progressionMoyenne =
    progressionCount > 0 ? Math.round(progressionSum / progressionCount) : 0;

  const recentEleveIds = eleveIds.slice(0, 3);
  const recentEleves: Array<{
    clerk_user_id: string;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    progressPercent: number;
    completedLessons: number;
    totalLessons: number;
  }> = [];
  for (const eid of recentEleveIds) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("clerk_user_id, first_name, last_name, email")
      .eq("clerk_user_id", eid)
      .maybeSingle();
    if (!profile) continue;
    const { data: prog } = await supabase
      .from("lesson_progress")
      .select("completed")
      .eq("clerk_user_id", eid);
    const completed = (prog ?? []).filter((p) => p.completed).length;
    recentEleves.push({
      ...profile,
      progressPercent: totalLessons > 0 ? (100 * completed) / totalLessons : 0,
      completedLessons: completed,
      totalLessons,
    });
  }

  return {
    nbEleves: eleveIds.length,
    nbCours: coursCount ?? 0,
    nextSessions: nextSessions ?? [],
    progressionMoyenne,
    recentEleves,
  };
}

export default async function ProfesseurDashboardPage() {
  const data = await getDashboardData();
  if (!data) return null;

  return (
    <div>
      <h1
        className="font-display text-3xl font-semibold"
        style={{ color: "#fff" }}
      >
        Tableau de bord
      </h1>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Vue d&apos;ensemble de votre activité
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Mes élèves actifs"
          value={data.nbEleves}
          icon={Users}
          color="var(--andalou-sauge)"
        />
        <StatCard
          label="Cours assignés"
          value={data.nbCours}
          icon={BookOpen}
          color="var(--or-brillant)"
        />
        <StatCard
          label="Prochaine session"
          value={
            data.nextSessions.length > 0
              ? new Date(data.nextSessions[0].session_date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })
              : "—"
          }
          icon={Calendar}
        />
        <StatCard
          label="Progression moyenne"
          value={`${data.progressionMoyenne}%`}
          icon={TrendingUp}
          color="var(--or-brillant)"
        />
      </div>

      <ProfDashboardClient
        nextSessions={data.nextSessions}
        recentEleves={data.recentEleves}
      />
    </div>
  );
}
