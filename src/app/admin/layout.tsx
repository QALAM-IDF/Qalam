export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const admin = await isAdmin();
  if (!admin) redirect("/");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f0f0f",
        position: "relative",
        zIndex: 100,
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
          zIndex: 200,
          overflowY: "auto",
          background: "#111111",
          borderRight: "1px solid #2a2a2a",
        }}
      >
        <AdminSidebar />
      </aside>

      <main
        className="md:ml-[220px]"
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: "32px",
          overflowX: "hidden",
          background: "#0f0f0f",
        }}
      >
        <a
          href="/admin"
          className="md:hidden mb-4 inline-block text-sm"
          style={{ color: "var(--or-brillant)" }}
        >
          ← Menu admin
        </a>
        {children}
      </main>
    </div>
  );
}
