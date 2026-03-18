export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { isProf } from "@/lib/prof";
import { ChoisirEspaceClient } from "./ChoisirEspaceClient";

export default async function ChoisirEspacePage() {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const [admin, prof] = await Promise.all([isAdmin(), isProf()]);

  if (admin && !prof) redirect("/admin");
  if (prof && !admin) redirect("/professeur");
  if (!admin && !prof) redirect("/espace-membre");

  return <ChoisirEspaceClient />;
}

