-- Table profils utilisateurs (liée aux users Clerk)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  univers TEXT CHECK (univers IN ('hommes', 'femmes', 'enfants')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table achats / accès forfaits
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  forfait TEXT NOT NULL CHECK (forfait IN ('decouverte', 'essentiel', 'intensif')),
  type TEXT NOT NULL CHECK (type IN ('unique', 'mensuel')),
  stripe_session_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table progression leçons
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  watch_time_seconds INTEGER DEFAULT 0,
  UNIQUE(clerk_user_id, course_id, lesson_id)
);

-- Index pour performance
CREATE INDEX idx_purchases_clerk ON purchases(clerk_user_id);
CREATE INDEX idx_progress_clerk ON lesson_progress(clerk_user_id);
CREATE INDEX idx_progress_course ON lesson_progress(course_id);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
