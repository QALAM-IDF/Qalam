import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserForfait } from "@/lib/user";
import ChoisirForfaitClient from "./ChoisirForfaitClient";

export default async function ChoisirForfaitPage() {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const forfait = await getUserForfait(userId);
  if (forfait) redirect("/espace-membre");

  return (
    <main
      className="grain-overlay min-h-screen py-20"
      style={{ background: "var(--beige-creme)" }}
    >
      <div className="section-shell">
        <p className="font-arabic text-3xl text-center" style={{ color: "var(--or-luxe)" }}>
          اختر عرضك
        </p>
        <h1 className="font-display text-4xl text-center mt-2" style={{ color: "var(--encre-noire)" }}>
          Choisir votre forfait
        </h1>
        <p className="text-center mt-4 max-w-xl mx-auto" style={{ color: "var(--encre-douce)" }}>
          Un seul paiement ou un abonnement mensuel — selon vos objectifs.
        </p>
        <ChoisirForfaitClient />
      </div>
    </main>
  );
}
