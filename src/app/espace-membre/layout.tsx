export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import {
  getOrCreateProfile,
  getUserForfait,
  getUserProgression,
  getUserRole,
  getMembersWithForfait,
} from "@/lib/user";
import { isAdmin } from "@/lib/admin";
import { MemberProvider } from "@/context/MemberContext";
import MemberSidebar from "@/components/membre/MemberSidebar";

export default async function EspaceMembreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { userId } = await auth();
    if (!userId) redirect("/connexion");

    let profile = null;
    let forfait = null;
    let progression: Awaited<ReturnType<typeof getUserProgression>> = [];

    try {
      profile = await getOrCreateProfile();
    } catch (e) {
      console.error("getOrCreateProfile error:", e);
    }

    let membersWithForfait: Awaited<ReturnType<typeof getMembersWithForfait>> = [];
    try {
      forfait = await getUserForfait(userId);
      membersWithForfait = await getMembersWithForfait(userId);
      if (membersWithForfait.length > 0 && !forfait) forfait = membersWithForfait[0]?.forfait ?? null;
    } catch (e) {
      console.error("getUserForfait error:", e);
    }

    let role = "eleve";
    try {
      role = await getUserRole(userId);
    } catch (e) {
      console.error("getUserRole error:", e);
    }

    const admin = await isAdmin();
    const isProfOrAdmin = role === "professeur" || admin;

    try {
      progression = await getUserProgression(userId);
    } catch (e) {
      console.error("getUserProgression error:", e);
    }

    const hasAnyForfait = forfait ?? membersWithForfait.length > 0;
    if (!hasAnyForfait && !isProfOrAdmin) {
      const supabase = (await import("@/lib/supabase/server")).createSupabaseAdmin();
      const { data: expiredPurchase } = await supabase
        .from("purchases")
        .select("forfait")
        .eq("clerk_user_id", userId)
        .eq("status", "expired")
        .limit(1)
        .maybeSingle();
      if (expiredPurchase) redirect("/abonnement-expire");
      redirect("/choisir-forfait");
    }

    const effectiveForfait = forfait ?? (isProfOrAdmin ? "intensif" : null);

    const isFirstAccess =
      profile &&
      new Date(profile.created_at).getTime() > Date.now() - 60_000;
    if (isFirstAccess && profile?.email && effectiveForfait) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (siteUrl) {
        fetch(`${siteUrl}/api/emails/bienvenue`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
            firstName: profile.first_name ?? "",
            forfait: effectiveForfait,
          }),
        }).catch(() => {});
      }
    }

    return (
      <MemberProvider
        value={{
          profile,
          members: membersWithForfait,
          initialForfait: effectiveForfait,
          progression: progression ?? [],
        }}
      >
        <div
          className="membre-layout min-h-screen"
          style={{ backgroundColor: "var(--beige-creme)" }}
        >
          <MemberSidebar />
          <main className="md:pl-[260px] pb-20 md:pb-0">{children}</main>
        </div>
      </MemberProvider>
    );
  } catch (error) {
    console.error("EspaceMembreLayout error:", error);
    redirect("/connexion");
  }
}
