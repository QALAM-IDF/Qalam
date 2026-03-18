export type FamilyMember = {
  id: string;
  clerk_user_id: string;
  prenom: string;
  nom?: string | null;
  age?: number | null;
  categorie: "homme" | "femme" | "enfant-5-8" | "enfant-9-12" | "enfant-13-15";
  avatar_initiales?: string | null;
  created_at: string;
};

export type FamilyMemberWithPurchase = FamilyMember & {
  forfait?: string | null;
  forfait_status?: string | null;
  forfait_type?: string | null;
  expires_at?: string | null;
};
