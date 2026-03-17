import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserForfait } from "@/lib/user";
import ChoisirForfaitClient from "./ChoisirForfaitClient";

export default async function ChoisirForfaitPage() {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const forfait = await getUserForfait(userId);
  if (forfait) redirect("/espace-membre");

  return <ChoisirForfaitClient />;
}
