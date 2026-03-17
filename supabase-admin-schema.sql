-- Phase 9 — Tables Admin (à exécuter dans Supabase SQL Editor)
-- Prérequis : la fonction update_updated_at doit exister (ou créer ci-dessous)

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table cours
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  level TEXT NOT NULL,
  forfait TEXT NOT NULL CHECK (forfait IN ('decouverte', 'essentiel', 'intensif')),
  univers TEXT DEFAULT 'mixte',
  description TEXT,
  total_hours INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table leçons
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT,
  youtube_id TEXT,
  pdf_url TEXT,
  duration TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table messages (formulaires de contact)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  source TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_courses" ON courses;
CREATE POLICY "admin_courses" ON courses USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_lessons" ON lessons;
CREATE POLICY "admin_lessons" ON lessons USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_messages" ON messages;
CREATE POLICY "admin_messages" ON messages USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS trigger_courses_updated_at ON courses;
CREATE TRIGGER trigger_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_lessons_updated_at ON lessons;
CREATE TRIGGER trigger_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
