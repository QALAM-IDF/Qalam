-- RBAC — Multi-admin + Logs d'accès
-- Exécuter dans Supabase SQL Editor

-- 1. Colonne is_admin dans profiles (multi-admin)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Mettre ton email en admin (remplacer par ton email)
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'ton-email-admin@gmail.com';

-- 2. Table logs d'accès
CREATE TABLE IF NOT EXISTS access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT,
  email TEXT,
  role TEXT,
  action TEXT NOT NULL,
  resource TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_user ON access_logs(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_logs_action ON access_logs(action);
CREATE INDEX IF NOT EXISTS idx_logs_created ON access_logs(created_at DESC);

ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_logs" ON access_logs;
CREATE POLICY "admin_logs" ON access_logs USING (true) WITH CHECK (true);
