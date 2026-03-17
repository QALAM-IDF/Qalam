export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import {
  getOrCreateProfile,
  getUserForfait,
  getUserProgression,
} from "@/lib/user";
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

    try {
      forfait = await getUserForfait(userId);
    } catch (e) {
      console.error("getUserForfait error:", e);
    }

    try {
      progression = await getUserProgression(userId);
    } catch (e) {
      console.error("getUserProgression error:", e);
    }

    if (!forfait) redirect("/choisir-forfait");

    const isFirstAccess =
      profile &&
      new Date(profile.created_at).getTime() > Date.now() - 60_000;
    if (isFirstAccess && profile?.email && forfait) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (siteUrl) {
        fetch(`${siteUrl}/api/emails/bienvenue`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
            firstName: profile.first_name ?? "",
            forfait,
          }),
        }).catch(() => {});
      }
    }

    return (
      <MemberProvider
        value={{
          profile,
          forfait,
          progression: progression ?? [],
        }}
      >
        <div
          className="min-h-screen"
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
