# Déploiement Vercel — Qalam

## Préparation effectuée (Phase 8)

- **next.config.ts** : `remotePatterns` pour `cdn.sanity.io` et `img.youtube.com`
- **Webhook Stripe** : `export const dynamic = 'force-dynamic'` dans `src/app/api/webhooks/stripe/route.ts`
- **.gitignore** : `.env`, `.env.local`, `.env*.local` (ne jamais commiter les clés)
- **Vercel Speed Insights** : `@vercel/speed-insights` ajouté dans `layout.tsx`
- **Vercel Analytics** : `@vercel/analytics` ajouté dans `layout.tsx`

## Étapes manuelles

### 1. Repo GitHub

```bash
git init
git add .
git commit -m "feat: Qalam v1 — phases 1-8"
git remote add origin https://github.com/[username]/qalam-academy.git
git branch -M main
git push -u origin main
```

### 2. Vercel

1. [vercel.com](https://vercel.com) → Login avec GitHub
2. Add New Project → importer le repo `qalam-academy`
3. **Environment Variables** : ajouter toutes les variables de `.env.local.example` (sans commiter `.env.local`)
4. **NEXT_PUBLIC_SITE_URL** : après le 1er déploiement, mettre l’URL Vercel (ex. `https://qalam-xxx.vercel.app`) puis Redeploy

### 3. Services externes (après déploiement)

- **Clerk** : Allowed redirect URLs + Sign-in/Sign-up/After URLs avec l’URL Vercel
- **Stripe** : Webhook `https://[ton-url]/api/webhooks/stripe` → mettre à jour `STRIPE_WEBHOOK_SECRET` dans Vercel
- **Sanity** : Webhook `https://[ton-url]/api/revalidate` + CORS Origins
- **Supabase** : Site URL dans Auth

### 4. Tests

- Pages, auth Clerk, paiement test (4242…), progression LMS, sitemap.xml, robots.txt

## Domaine custom (plus tard)

Vercel → Settings → Domains → Add `qalam.academy` → configurer les enregistrements DNS (A + CNAME) puis mettre à jour `NEXT_PUBLIC_SITE_URL` et toutes les URLs dans Clerk, Stripe, Sanity, Supabase.
