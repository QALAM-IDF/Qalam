"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Mail,
  Globe,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { QalamLogo } from "@/components/shared/QalamLogo";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cours", label: "Cours", icon: BookOpen },
  { href: "/admin/nouveau-cours", label: "Nouveau cours", icon: PlusCircle },
  { href: "/admin/eleves", label: "Élèves", icon: Users },
  { href: "/admin/paiements", label: "Paiements", icon: CreditCard },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-64 flex-col border-r md:fixed md:inset-y-0 md:left-0 md:z-30"
      style={{
        background: "#111111",
        borderColor: "#2a2a2a",
      }}
    >
      <div className="border-b p-6" style={{ borderColor: "#2a2a2a" }}>
        <Link href="/admin" className="block">
          <QalamLogo height={36} invert />
        </Link>
        <span
          className="mt-2 inline-block rounded px-2 py-0.5 text-xs font-bold tracking-wider"
          style={{
            background: "var(--or-brillant)",
            color: "#0f0f0f",
          }}
        >
          ADMIN
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              style={{
                background: active ? "rgba(212, 175, 55, 0.1)" : "transparent",
                borderLeft: active ? "3px solid var(--or-brillant)" : "3px solid transparent",
                color: active ? "var(--or-brillant)" : "#a0a0a0",
              }}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4" style={{ borderColor: "#2a2a2a" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#a0a0a0] transition-colors hover:bg-[#1a1a1a] hover:text-white"
        >
          <Globe className="h-5 w-5" />
          Voir le site
        </a>
        <SignOutButton>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#a0a0a0] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
