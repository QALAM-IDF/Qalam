export type Profile = {
  id: string;
  clerk_user_id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  univers?: string | null;
  role?: string | null;
  specialites?: string[] | null;
  is_admin?: boolean;
  created_at: string;
  updated_at?: string;
};

export type Purchase = {
  id: string;
  clerk_user_id: string;
  forfait: string;
  type: "unique" | "mensuel";
  stripe_session_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  status: "active" | "cancelled" | "expired";
  purchased_at: string;
  expires_at?: string | null;
  updated_at?: string;
};

export type LessonProgress = {
  id: string;
  clerk_user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string | null;
  quiz_score?: number | null;
  watch_time_seconds?: number;
};
