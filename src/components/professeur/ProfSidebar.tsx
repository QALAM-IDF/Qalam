"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Globe,
  LogOut,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { QalamLogo } from "@/components/shared/QalamLogo";

const navItems = [
  { href: "/professeur", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/professeur/eleves", label: "Mes élèves", icon: Users },
  { href: "/professeur/cours", label: "Mes cours", icon: BookOpen },
  { href: "/professeur/planning", label: "Planning", icon: Calendar },
  { href: "/professeur/messages", label: "Messages", icon: MessageSquare },
];

type ProfSidebarProps = {
  profile: {
    first_name?: string | null;
    last_name?: string | null;
    specialites?: string[] | null;
  } | null;
};

export function ProfSidebar({ profile }: ProfSidebarProps) {
  const pathname = usePathname();
  const specialites = profile?.specialites ?? [];
  const specialitesLabel =
    specialites.length > 0
      ? specialites
          .map((s) =>
            s === "hommes" ? "Hommes" : s === "enfants" ? "Enfants" : s === "femmes" ? "Femmes" : s
          )
          .join(" · ")
      : "—";

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
      }}
    >
      <div className="border-b pb-4" style={{ borderColor: "#1a2a1a" }}>
        <Link href="/professeur" className="block">
          <QalamLogo height={36} invert />
        </Link>
        <span
          className="mt-2 inline-block rounded px-2 py-0.5 text-xs font-bold tracking-wider"
          style={{
            background: "var(--andalou-sauge)",
            color: "#fff",
          }}
        >
          PROF ✦
        </span>
        {specialites.length > 0 && (
          <p
            className="mt-1 text-xs"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {specialitesLabel}
          </p>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 pt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/professeur" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              style={{
                background: active ? "rgba(45, 79, 45, 0.3)" : "transparent",
                borderLeft: active
                  ? "3px solid var(--or-brillant)"
                  : "3px solid transparent",
                color: active ? "var(--or-brillant)" : "rgba(255,255,255,0.7)",
              }}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t pt-4" style={{ borderColor: "#1a2a1a" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors"
          style={{
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <Globe className="h-5 w-5" />
          Voir le site
        </a>
        <SignOutButton>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </SignOutButton>
      </div>
      {profile && (
        <div
          className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{
              background: "var(--andalou-sauge)",
              color: "#fff",
            }}
          >
            {(profile.first_name?.[0] ?? "P") + (profile.last_name?.[0] ?? "")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" style={{ color: "#fff" }}>
              {profile.first_name} {profile.last_name}
            </p>
            <p className="truncate text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              {specialitesLabel}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
