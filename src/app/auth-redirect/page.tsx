export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getOrCreateProfile,
  getUserForfait,
  getUserRole,
} from "@/lib/user";
import { isAdmin } from "@/lib/admin";

export default async function AuthRedirectPage() {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const admin = await isAdmin();
  if (admin) redirect("/admin");

  try {
    await getOrCreateProfile();
  } catch {}

  const role = await getUserRole(userId);
  if (role === "professeur") redirect("/professeur");

  const forfait = await getUserForfait(userId).catch(() => null);
  if (forfait) redirect("/espace-membre");

  redirect("/choisir-forfait");
}
