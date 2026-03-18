"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import type { MemberWithForfait } from "@/lib/user";

export type Profile = {
  id: string;
  clerk_user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  univers: string | null;
  created_at: string;
  updated_at: string;
} | null;

export type LessonProgressItem = {
  id: string;
  clerk_user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  quiz_score: number | null;
  watch_time_seconds: number;
};

type MemberContextValue = {
  profile: Profile;
  forfait: string | null;
  progression: LessonProgressItem[];
  members: MemberWithForfait[];
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
};

const MemberContext = createContext<MemberContextValue | null>(null);

export function MemberProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: Omit<MemberContextValue, "forfait" | "selectedMemberId" | "setSelectedMemberId"> & { initialForfait: string | null };
}) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const { members, initialForfait } = value;
  const forfait = useMemo(() => {
    if (!members.length) return initialForfait;
    const m = selectedMemberId
      ? members.find((x) => x.id === selectedMemberId)
      : members[0];
    return m?.forfait ?? initialForfait;
  }, [members, selectedMemberId, initialForfait]);

  const ctxValue: MemberContextValue = {
    ...value,
    forfait,
    members,
    selectedMemberId,
    setSelectedMemberId,
  };
  return (
    <MemberContext.Provider value={ctxValue}>{children}</MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error("useMember must be used within MemberProvider");
  return ctx;
}
