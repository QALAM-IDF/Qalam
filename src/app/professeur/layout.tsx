export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isProf, getProfProfile } from "@/lib/prof";
import { ProfSidebar } from "@/components/professeur/ProfSidebar";

export default async function ProfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const prof = await isProf();
  if (!prof) redirect("/");

  const profile = await getProfProfile();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.style.background='#0a0f0a';document.body.style.color='#fff';`,
        }}
      />
      <div
        className="prof-layout"
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#0a0f0a",
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          overflowY: "auto",
        }}
      >
        <aside
          className="hidden md:block"
          style={{
            width: "220px",
            minWidth: "220px",
            flexShrink: 0,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 9100,
            overflowY: "auto",
            background: "#0d150d",
            borderRight: "1px solid #1a2a1a",
          }}
        >
          <ProfSidebar profile={profile} />
        </aside>

        <main
          className="md:ml-[220px]"
          style={{
            flex: 1,
            minHeight: "100vh",
            padding: "32px",
            background: "#0a0f0a",
          }}
        >
          <a
            href="/professeur"
            className="md:hidden mb-4 inline-block text-sm"
            style={{ color: "var(--or-brillant)" }}
          >
            ← Menu professeur
          </a>
          {children}
        </main>
      </div>
    </>
  );
}
