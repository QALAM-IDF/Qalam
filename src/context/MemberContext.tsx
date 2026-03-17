"use client";

import { createContext, useContext, type ReactNode } from "react";

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
};

const MemberContext = createContext<MemberContextValue | null>(null);

export function MemberProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: MemberContextValue;
}) {
  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error("useMember must be used within MemberProvider");
  return ctx;
}
