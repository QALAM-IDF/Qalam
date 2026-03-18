# CHECKLIST SQL PRODUCTION — QALAM

## À exécuter dans Supabase SQL Editor avant mise en ligne

### 1. Vérification des tables existantes

Exécuter :

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Résultat attendu (au moins 9 tables) :**

- access_logs ✅
- courses ✅
- lesson_progress ✅
- lessons ✅
- messages ✅
- prof_eleves ✅
- profiles ✅
- purchases ✅
- sessions ✅

---

### 2. Vérification des colonnes critiques (profiles)

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;
```

**Colonnes attendues :**

- id, clerk_user_id, email, first_name, last_name, phone
- univers, role, specialites, is_admin
- created_at, updated_at ✅

---

### 3. Vérification des index critiques

```sql
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('purchases', 'lesson_progress', 'profiles', 'access_logs')
ORDER BY tablename, indexname;
```

S’assurer que les index sur `clerk_user_id`, `stripe_session_id`, `created_at` existent selon vos schémas.

---

### 4. Vérification RLS activé

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Toutes les tables doivent avoir `rowsecurity = true`** ✅

---

### 5. Vérification admin

```sql
SELECT email, role, is_admin
FROM profiles
WHERE is_admin = TRUE OR role = 'admin';
```

**Doit retourner au moins 1 ligne** (votre compte admin) ✅

Si vide, exécuter (en remplaçant l’email) :

```sql
UPDATE profiles SET is_admin = TRUE, role = 'admin' WHERE email = 'votre-email@exemple.com';
```

---

### 6. Scripts à avoir exécutés

- `supabase-schema.sql` (profiles, purchases, lesson_progress)
- `supabase-admin-schema.sql` (courses, lessons, messages)
- `supabase-phase11-prof.sql` (sessions, prof_eleves)
- `supabase-rbac.sql` (is_admin, access_logs)
