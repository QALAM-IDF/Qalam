-- Refonte forfaits famille : table family_members + colonne purchases.family_member_id
-- Exécuter dans l’éditeur SQL Supabase.

-- Table membres famille (sous un compte Clerk)
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  prenom TEXT NOT NULL,
  nom TEXT,
  age INTEGER,
  categorie TEXT NOT NULL CHECK (
    categorie IN ('homme', 'femme', 'enfant-5-8', 'enfant-9-12', 'enfant-13-15')
  ),
  avatar_initiales TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optionnel : si profiles(clerk_user_id) est UNIQUE, décommenter pour lier :
-- ALTER TABLE family_members ADD CONSTRAINT family_members_clerk_user_id_fkey
--   FOREIGN KEY (clerk_user_id) REFERENCES profiles(clerk_user_id) ON DELETE CASCADE;

-- Mettre à jour purchases pour lier à un membre famille
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS family_member_id UUID
  REFERENCES family_members(id) ON DELETE SET NULL;

-- Index
CREATE INDEX IF NOT EXISTS idx_family_clerk ON family_members(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_member ON purchases(family_member_id);

-- RLS
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "family_members_policy" ON family_members;
CREATE POLICY "family_members_policy" ON family_members
  USING (true) WITH CHECK (true);
