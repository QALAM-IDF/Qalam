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

  try {
    await getOrCreateProfile();
  } catch {}

  const [admin, role] = await Promise.all([isAdmin(), getUserRole(userId)]);
  const prof = role === "professeur";

  if (admin && prof) redirect("/choisir-espace");
  if (admin) redirect("/admin");
  if (prof) redirect("/professeur");

  const forfait = await getUserForfait(userId).catch(() => null);
  if (forfait) redirect("/espace-membre");

  redirect("/choisir-forfait");
}
