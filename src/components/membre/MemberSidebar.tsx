"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, TrendingUp, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { QalamLogo } from "@/components/shared/QalamLogo";
import { useMember } from "@/context/MemberContext";
import { useMobile } from "@/hooks/useMobile";

const navItems = [
  { href: "/espace-membre", label: "Tableau de bord", icon: Home },
  { href: "/espace-membre/cours", label: "Mes cours", icon: BookOpen },
  { href: "/espace-membre/progression", label: "Ma progression", icon: TrendingUp },
];

const forfaitLabels: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
  "hommes-decouverte": "Découverte",
  "hommes-essentiel": "Essentiel",
  "hommes-particulier": "Particulier",
  "femmes-decouverte": "Découverte",
  "femmes-essentiel": "Essentiel",
  "femmes-particulier": "Particulier",
  "enfant-5-8": "Enfants 5-8 ans",
  "enfant-9-12": "Enfants 9-12 ans",
  "enfant-13-15": "Enfants 13-15 ans",
};

export default function MemberSidebar() {
  const pathname = usePathname();
  const isMobile = useMobile(768);
  const { profile, forfait, members, selectedMemberId, setSelectedMemberId } = useMember();
  const firstName = profile?.first_name ?? "";
  const lastName = profile?.last_name ?? "";
  const currentMember = selectedMemberId ? members.find((m) => m.id === selectedMemberId) : members[0];
  const showMemberSelector = members.length > 1;

  if (isMobile) {
    return (
      <nav
        className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t py-2"
        style={{
          backgroundColor: "var(--encre-noire)",
          borderColor: "var(--or-brillant)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/espace-membre"
              ? pathname === "/espace-membre"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2"
              style={{ color: active ? "var(--or-brillant)" : "var(--beige-creme)" }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r"
      style={{
        backgroundColor: "var(--encre-noire)",
        borderColor: "var(--or-brillant)",
      }}
    >
      <div className="border-b p-6" style={{ borderColor: "var(--or-brillant)" }}>
        <Link href="/">
          <QalamLogo height={36} invert />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {showMemberSelector && (
          <div className="mb-4">
            <p className="text-xs mb-2" style={{ color: "var(--encre-douce)" }}>
              Pour qui consultez-vous ?
            </p>
            <select
              value={selectedMemberId ?? (members[0]?.id ?? "")}
              onChange={(e) => setSelectedMemberId(e.target.value || null)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{
                background: "var(--beige-creme)",
                borderColor: "var(--or-brillant)",
                color: "var(--encre-noire)",
              }}
            >
              {members.map((m) => (
                <option key={m.id ?? "self"} value={m.id ?? ""}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-semibold"
            style={{
              backgroundColor: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            {currentMember ? currentMember.label.slice(0, 2).toUpperCase() : (firstName[0] ?? "") + (lastName[0] ?? "")}
          </div>
          <div>
            <p className="font-display font-medium" style={{ color: "var(--beige-creme)" }}>
              {(currentMember?.label ?? `${firstName} ${lastName}`.trim()) || "Membre"}
            </p>
            <span className="text-xs" style={{ color: "var(--or-brillant)" }}>
              {forfaitLabels[forfait ?? ""] ?? (forfait ?? "")}
            </span>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/espace-membre"
                ? pathname === "/espace-membre"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  active ? "border-l-4" : ""
                }`}
                style={{
                  backgroundColor: active ? "rgba(184, 134, 11, 0.2)" : "transparent",
                  borderLeftColor: active ? "var(--or-brillant)" : "transparent",
                  color: active ? "var(--or-brillant)" : "var(--beige-creme)",
                }}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4">
          <SignOutButton>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 opacity-70 transition-opacity hover:opacity-100"
              style={{ color: "var(--beige-creme)" }}
            >
              <LogOut className="h-5 w-5" />
              <span>Se déconnecter</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
