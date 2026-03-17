export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateProfile, getUserForfait } from "@/lib/user";

export default async function AuthRedirectPage() {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/connexion");
    }

    try {
      await getOrCreateProfile();
    } catch (e) {
      console.error("getOrCreateProfile error:", e);
    }

    let forfait = null;
    try {
      forfait = await getUserForfait(userId);
    } catch (e) {
      console.error("getUserForfait error:", e);
    }

    if (forfait) {
      redirect("/espace-membre");
    } else {
      redirect("/choisir-forfait");
    }
  } catch {
    redirect("/choisir-forfait");
  }
}
