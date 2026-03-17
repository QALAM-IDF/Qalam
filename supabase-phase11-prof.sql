-- Phase 11 — Dashboard Professeur
-- Exécuter dans Supabase SQL Editor

-- Table planning sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prof_clerk_id TEXT NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  univers TEXT CHECK (univers IN ('hommes', 'femmes', 'enfants', 'mixte')),
  session_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 90,
  zoom_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignation élèves → professeurs
CREATE TABLE IF NOT EXISTS prof_eleves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prof_clerk_id TEXT NOT NULL,
  eleve_clerk_id TEXT NOT NULL,
  univers TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(prof_clerk_id, eleve_clerk_id)
);

-- Référence optionnelle (si profiles a clerk_user_id comme PK, sinon retirer la REFERENCE)
-- ALTER TABLE prof_eleves ADD CONSTRAINT fk_eleve FOREIGN KEY (eleve_clerk_id) REFERENCES profiles(clerk_user_id);

-- RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prof_eleves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prof_sessions" ON sessions USING (true) WITH CHECK (true);
CREATE POLICY "prof_eleves_policy" ON prof_eleves USING (true) WITH CHECK (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_sessions_prof ON sessions(prof_clerk_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_prof_eleves_prof ON prof_eleves(prof_clerk_id);
