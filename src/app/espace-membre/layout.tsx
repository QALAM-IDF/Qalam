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
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const [profile, forfait, progression] = await Promise.all([
    getOrCreateProfile(),
    getUserForfait(userId),
    getUserProgression(userId),
  ]);

  if (!forfait) redirect("/choisir-forfait");

  return (
    <MemberProvider
      value={{
        profile,
        forfait,
        progression,
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
}
