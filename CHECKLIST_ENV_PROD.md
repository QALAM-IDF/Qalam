# CHECKLIST VARIABLES D'ENVIRONNEMENT — PRODUCTION

## Dans Vercel → Settings → Environment Variables

**Toutes doivent être présentes pour l’environnement Production (et Preview si besoin).**

---

### Clerk (6 variables)

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_...`
- [ ] `CLERK_SECRET_KEY` = `sk_live_...`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/connexion`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/inscription`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/auth-redirect`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/auth-redirect`

---

### Stripe (8 variables)

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...`
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...` **(celui du webhook configuré sur l’URL Vercel, PAS celui de `stripe listen` en local)**
- [ ] `STRIPE_PRICE_DECOUVERTE_UNIQUE` = `price_...`
- [ ] `STRIPE_PRICE_ESSENTIEL_UNIQUE` = `price_...`
- [ ] `STRIPE_PRICE_ESSENTIEL_MENSUEL` = `price_...`
- [ ] `STRIPE_PRICE_INTENSIF_UNIQUE` = `price_...`
- [ ] `STRIPE_PRICE_INTENSIF_MENSUEL` = `price_...`

---

### Supabase (3 variables)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://xxx.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = `eyJ...` — **ne doit jamais être exposé côté client**

---

### Sanity (4 variables, optionnel si pas de blog)

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` = `...`
- [ ] `NEXT_PUBLIC_SANITY_DATASET` = `production`
- [ ] `SANITY_API_READ_TOKEN` = `sk...`
- [ ] `SANITY_WEBHOOK_SECRET` = chaîne aléatoire (si webhook Sanity utilisé)

---

### Resend (2 variables)

- [ ] `RESEND_API_KEY` = `re_...`
- [ ] `CONTACT_EMAIL` = email de contact / admin (ex. `contact@qalam.academy`)

---

### App (4 variables)

- [ ] `NEXT_PUBLIC_SITE_URL` = URL du site (ex. `https://qalam.vercel.app` ou domaine custom) **sans slash final**
- [ ] `ADMIN_EMAIL` = email du compte admin (fallback si `is_admin` non utilisé)
- [ ] `CRON_SECRET` = chaîne aléatoire longue (pour sécuriser `/api/cron/*`)
- [ ] `SANITY_WEBHOOK_SECRET` = chaîne aléatoire (si utilisé)

---

## Points critiques

1. **STRIPE_WEBHOOK_SECRET** : doit être celui du webhook configuré dans le dashboard Stripe pointant vers `https://votre-domaine.com/api/webhooks/stripe`, pas celui généré en local par `stripe listen`.
2. **SUPABASE_SERVICE_ROLE_KEY** : ne doit jamais apparaître dans le code côté client (uniquement dans les routes API / server).
3. **NEXT_PUBLIC_SITE_URL** : doit être l’URL exacte du site, sans slash final (ex. `https://qalam.vercel.app`).
4. Après toute modification de variable : **Redeploy** du projet Vercel pour prendre en compte les changements.
