# RAPPORT D'AUDIT FINAL — QALAM

**Date :** 17 mars 2025  
**Version :** Phases 1–11 + RBAC complètes  
**Stack :** Next.js 16, React 19, TypeScript, Tailwind 4, Clerk, Stripe, Supabase, Sanity, Resend

---

## 1. ARCHITECTURE GÉNÉRALE — /20

### Structure des fichiers

- **App Router** : organisation claire `app/` avec routes publiques (/, /hommes, /femmes, /enfants, /tarifs, /cpf, /contact, /blog, /a-propos), auth (connexion, inscription, auth-redirect), espaces protégés (espace-membre, admin, professeur), et pages dédiées (choisir-forfait, paiement-succes, abonnement-expire).
- **Séparation** : `components/` (ui, shared, home, blog, admin, professeur, membre, contact, about), `lib/` (supabase, emails, courses, user, admin, prof, logging, seo), `context/`, `data/`, `sanity/`. Bonne séparation par domaine.
- **Cohérence** : quelques doublons de logique (ex. récupération forfait/courses côté client dans plusieurs pages membre). API routes bien regroupées sous `api/admin`, `api/professeur`, `api/courses`, `api/emails`, `api/cron`, `api/webhooks`.

**Note : 15/20**

### Stack technique

- Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind 4, Framer Motion, Clerk 7, Stripe 20, Supabase (ssr + js), Sanity (next-sanity), Resend + React Email, Vercel Analytics/Speed Insights.
- Stack moderne et adaptée (SSR, auth, paiement, CMS, emails). Dépréciation middleware → proxy signalée au build ; Sanity image-url en default export déprécié.

**Note : 17/20**

### Points forts

- Structure app/ claire et prévisible.
- Libs bien isolées (auth, BDD, emails, logging).
- Trois zones distinctes (public, membre, admin, professeur) avec layouts dédiés.

### Points faibles

- Pas de couche “services” explicite entre API routes et Supabase.
- Types partagés encore importés depuis `@/data/mock-courses` (Course, Lesson, QuizQuestion) au lieu d’un `@/types` dédié.

---

## 2. QUALITÉ DU CODE — /20

### TypeScript

- Typage globalement correct : interfaces pour props, types pour API, types Sanity dédiés. Aucun `: any` repéré dans `src/`.
- Quelques casts `as` (ex. `as DbCourse`, `as string[]`) et types dérivés de mock-courses. Cohérence correcte.

**Note : 16/20**

### Composants React

- Bonne répartition Client / Server ; `'use client'` présent où nécessaire (hooks, formulaires, sidebars). Composants réutilisables (StatCard, DataTable, SessionCard, MessageForm, etc.).
- Contexte MemberProvider pour forfait/progression. Par endroits, effets avec `queueMicrotask` pour satisfaire des règles ESLint (setState dans effet), ce qui alourdit un peu la lecture.

**Note : 15/20**

### API Routes

- Validation minimale (présence userId, forfait, courseId). `requireAdmin()` / `requireProf()` systématiques sur les routes protégées. Réponses JSON cohérentes.
- Peu de schémas de validation (ex. Zod) ; erreurs parfois génériques. `force-dynamic` utilisé là où il faut (auth, cookies).

**Note : 14/20**

### Performance

- Server Components pour les layouts et pages statiques/données ; Client pour formulaires et listes interactives. Pas de dynamic imports visibles pour les gros composants. Pas de memoization explicite (React.memo, useMemo) sur les listes longues.

**Note : 14/20**

---

## 3. SÉCURITÉ — /20

### Authentification (Clerk)

- Middleware : protection de `/espace-membre`, `/admin`, `/professeur`, `/api/progression`, `/api/admin`, `/api/professeur`, `/api/courses`. Pas de protection sur `/api/checkout` (auth dans la route) ni `/api/webhooks/stripe` (signature).
- Redirections : auth-redirect selon rôle (admin → /admin, professeur → /professeur, élève avec forfait → /espace-membre, sinon choisir-forfait ou abonnement-expire). Connexion/inscription avec `forceRedirectUrl="/auth-redirect"`.

**Note : 17/20**

### Autorisation (RBAC)

- Admin : `isAdmin()` (Supabase `is_admin` + fallback `ADMIN_EMAIL`), `requireAdmin()` sur toutes les routes admin. Bouton promouvoir/révoquer admin dans /admin/eleves.
- Professeur : `requireProf()`, filtrage par `specialites` (cours et élèves). Sans spécialités, retourne tableaux vides.
- Élève : forfait via `getUserForfait()`, accès cours via `forfaitAccess` et vérification par cours dans `api/courses/[courseId]`. Prof/admin sans forfait reçoivent forfait “intensif” pour les cours.

**Note : 16/20**

### Données sensibles

- Clés et secrets dans `process.env` ; `.env.local.example` à jour (Clerk, Stripe, Supabase, Admin, Resend, Cron, Sanity). Aucune clé en dur dans le code. Supabase utilise `createSupabaseAdmin()` (service_role) côté serveur pour admin/prof/élèves.

**Note : 18/20**

### Webhook Stripe

- Corps lu en `req.text()`, signature vérifiée avec `STRIPE_WEBHOOK_SECRET` via `stripe.webhooks.constructEvent`. En cas d’erreur signature → 400. Metadata `clerk_user_id`, `forfait`, `type` validées ; si manquantes → 400. Insert `purchases` avec `stripe_session_id` (UNIQUE en BDD) : ré-envoi Stripe → conflit, pas de doublon. Réponse toujours 200 côté route (même en cas d’erreur insert) pour limiter les retries.

**Note : 16/20**

---

## 4. DESIGN & UX — /20

### Cohérence visuelle

- Variables CSS centralisées (`globals.css`) : palettes par univers (desert, andalou, magie), or, beige, encre. Thèmes distincts admin (#0f0f0f), professeur (#0a0f0a), membre (beige-creme). Polices (Amiri, Cormorant, Lato, Nunito) chargées et utilisées de façon cohérente.

**Note : 17/20**

### Responsive mobile

- Breakpoints Tailwind (md:, sm:), sidebars masquées ou repliables sur petit écran (admin, professeur, membre). NavBar avec menu burger. Touch targets et espacements globalement corrects.

**Note : 15/20**

### Animations

- Framer Motion utilisé (PageTransition, cartes, modales). Animations raisonnables ; pas de surcharge évidente. CustomCursor désactivé sur admin/professeur et sous 1024px.

**Note : 15/20**

### Accessibilité

- Quelques `aria-label`, `aria-expanded` (NavBar). Pas d’audit systématique (contraste, focus, landmarks). Pas de skip link visible. Images avec `alt` dans les parties vérifiées (ex. LessonForm : alt="Miniature YouTube").

**Note : 12/20**

---

## 5. FONCTIONNALITÉS — /20

### Site public

- Accueil, Hommes / Femmes / Enfants (layouts et contenus dédiés), Tarifs, CPF, Contact, Blog (Sanity), À propos. Formulaires contact et lead. Liens “Mon espace” → auth-redirect.

**Note : 17/20**

### Espace membre (LMS)

- Tableau de bord, liste cours (selon forfait), détail cours et leçons, lecteur vidéo (YouTube), quiz, PDF, progression sauvegardée via `/api/progression`. Données cours provenant de l’API Supabase (plus de mock pour les données).

**Note : 16/20**

### Paiement Stripe

- Choix forfait (unique/mensuel/CPF), appel `/api/checkout` → redirection Stripe. Webhook `checkout.session.completed` + `invoice.payment_succeeded` / `customer.subscription.deleted`. Emails confirmation et notification admin. Déblocage accès via `purchases` et `getUserForfait()`.

**Note : 17/20**

### Dashboard Admin

- Stats, CRUD cours (dont nouveau cours), leçons, élèves (forfait, rôle, admin), paiements, messages, logs d’accès. Sidebar et layout dédiés. Pas de NavBar/Footer sur /admin (ConditionalLayout).

**Note : 17/20**

### Dashboard Professeur

- Tableau de bord, élèves (filtrés par spécialités/assignations), cours (lecture seule, par univers), planning (sessions), messagerie (email élève). ProfSidebar, layout vert distinct.

**Note : 16/20**

---

## 6. SEO & PERFORMANCE — /20

### Métadonnées

- `lib/seo.ts` : defaultMetadata (title, description, keywords, OG, Twitter), `organizationJsonLd`, `courseJsonLd`, `articleJsonLd`. Layout racine avec metadata et JSON-LD organisation. Pages importantes avec `metadata` ou `generateMetadata` (blog, contact, tarifs, cpf, a-propos, univers). Template title "%s | Qalam".

**Note : 16/20**

### Sitemap & robots

- `sitemap.ts` : routes statiques + slugs blog Sanity, priorités et changeFrequency. `robots.ts` : allow "/", disallow "/espace-membre/", "/api/", "/choisir-forfait/", sitemap indiqué.

**Note : 17/20**

### Core Web Vitals estimés

- Speed Insights et Analytics Vercel présents. Pas de lazy-load systématique des images (next/image partiel ; LessonForm utilise `<img>` pour miniature YouTube). Curseur custom et Framer Motion peuvent ajouter un peu de coût. Pas de mesure réelle des CWV dans le rapport.

**Note : 13/20**

---

## 7. INFRASTRUCTURE & DÉPLOIEMENT — /20

### Vercel

- `vercel.json` : crons définis (progression hebdo, relance mensuelle). Variables d’environnement documentées dans `.env.local.example`. Pas de config explicite de régions ou de fonctions dans le fichier.

**Note : 16/20**

### Supabase

- Schémas SQL fournis (profiles, purchases, lesson_progress, courses, lessons, messages, sessions, prof_eleves, access_logs, is_admin). RLS activé ; politiques basiques (certaines permissives pour admin). Index sur clés étrangères et dates. Relations cohérentes.

**Note : 15/20**

### CI/CD

- Aucun pipeline CI (GitHub Actions, etc.) visible dans le dépôt. Build et lint à la main. Déploiement Vercel typiquement lié au dépôt Git.

**Note : 12/20**

---

## 8. BUGS IDENTIFIÉS

### Critiques (bloquants)

- Aucun bug bloquant identifié. Le build et le lint passent. Les flux auth, paiement, accès cours et RBAC sont cohérents.

### Importants (dégradent l’expérience)

- **Webhook Stripe** : en cas d’erreur à l’insert `purchases`, la route renvoie tout de même 200 pour éviter les retries Stripe ; l’achat peut ne pas être enregistré alors que le paiement a eu lieu. À renforcer (log, alerte, possible rejeu manuel ou idempotence plus explicite).
- **Idempotence webhook** : pas de vérification explicite de l’existence de `stripe_session_id` avant insert ; la contrainte UNIQUE évite le doublon mais l’erreur est seulement loguée.

### Mineurs (cosmétiques)

- **LessonForm.tsx (l.77)** : utilisation de `<img>` pour la miniature YouTube (ESLint next/image) ; avoir un `alt` est déjà le cas.
- Liens **CPF / choisir-forfait** en `href="#"` avec TODO (attente de vrais liens Mon Compte Formation).

---

## 9. DETTE TECHNIQUE

### Fichiers avec TODO restants

- `src/app/choisir-forfait/ChoisirForfaitClient.tsx` : 2 TODO (liens CPF Arabe / Anglais).
- `src/app/cpf/page.tsx` : 4 TODO (liens formation Arabe/Anglais CPF, liens Mon Compte Formation).

### any TypeScript restants

- Aucun `: any` trouvé dans `src/`.

### Données mockées encore présentes

- **Types uniquement** : imports depuis `@/data/mock-courses` pour les types `Course`, `Lesson`, `QuizQuestion` dans :
  - `src/lib/courses.ts`
  - `src/components/membre/MemberCourseCard.tsx`, `LessonList.tsx`, `QuizBlock.tsx`
  - `src/app/espace-membre/page.tsx`, `cours/page.tsx`, `cours/[courseId]/[lessonId]/page.tsx`, `progression/page.tsx`
- Fichier `src/data/mock-courses.ts` contient encore `mockCourses` et `mockUser` ; ils ne sont plus utilisés pour les données affichées (remplacées par l’API).

### console.log restants

- Aucun `console.log` dans `src/`. Des `console.error` restent (webhook, erreurs critiques), ce qui est souhaitable.

### href="#" placeholder

- `src/app/cpf/page.tsx` : 4 occurrences (l.317, 383, 495, 509).
- `src/app/choisir-forfait/ChoisirForfaitClient.tsx` : 2 occurrences (l.184, 226).  
  Tous associés à des commentaires TODO pour les liens CPF.

---

## 10. NOTE GLOBALE

| Catégorie            | Note   | Commentaire |
|---------------------|--------|-------------|
| Architecture        | 16/20  | Structure claire ; manque une couche services et un types/ dédié. |
| Qualité du code     | 15/20  | Bon typage et composants ; API peu validées formellement, peu d’optimisations explicites. |
| Sécurité             | 17/20  | Auth et RBAC solides ; webhook à durcir (alertes, idempotence). |
| Design & UX          | 15/20  | Cohérence et responsive corrects ; accessibilité à renforcer. |
| Fonctionnalités      | 17/20  | Toutes les zones (public, membre, admin, prof) sont en place et utilisables. |
| SEO & Performance    | 15/20  | Bonne base SEO et sitemap ; CWV et images à optimiser. |
| Infrastructure       | 14/20  | Vercel et Supabase bien utilisés ; pas de CI/CD visible. |
| **MOYENNE GÉNÉRALE**| **15,6/20** | Projet prêt pour une mise en production contrôlée, avec un plan de durcissement et de suivi. |

---

## 11. PLAN D’ACTION PRIORISÉ

### Priorité 1 — Critique (avant mise en prod réelle)

1. **Renforcer le webhook Stripe** (≈ 1–2 h) : en cas d’échec insert `purchases`, logger + alerter (email admin ou log métier) et documenter la procédure de rejeu ; optionnellement vérifier l’existence de `stripe_session_id` avant insert pour renvoyer 200 idempotent sans erreur.
2. **Vérifier les scripts SQL** (≈ 0,5 h) : s’assurer que tous les scripts (supabase-schema, admin, phase11, rbac) ont été exécutés en production et que les colonnes (ex. `is_admin`, `role`, `specialites`) et tables (`access_logs`, `sessions`, `prof_eleves`) existent.
3. **Variables d’environnement** (≈ 0,5 h) : vérifier en prod que `CRON_SECRET`, `STRIPE_WEBHOOK_SECRET`, `ADMIN_EMAIL`, `NEXT_PUBLIC_SITE_URL` et les clés Stripe/Supabase/Clerk/Resend sont bien définies.

### Priorité 2 — Important (première semaine de prod)

4. **Accessibilité** (≈ 3–4 h) : audit rapide (contraste, focus, aria), ajout d’un skip link, vérification des labels de formulaire et des boutons.
5. **Idempotence webhook** (≈ 1 h) : avant insert, faire un `select` par `stripe_session_id` ; si déjà présent, renvoyer 200 sans réinsert.
6. **Validation API** (≈ 2–3 h) : introduire Zod (ou équivalent) sur les routes sensibles (checkout, progression, admin/eleves, professeur/message) pour valider les body/query.
7. **Remplacer les liens CPF** (≈ 0,5 h) : dès que les URLs Mon Compte Formation sont connues, remplacer les `href="#"` et retirer les TODO.

### Priorité 3 — Améliorations (premier mois)

8. **Types dédiés** (≈ 1 h) : déplacer les types `Course`, `Lesson`, `QuizQuestion` dans `src/types/` (ex. `courses.ts`) et faire pointer les imports vers ce module ; supprimer ou réduire `mock-courses.ts` au strict nécessaire.
9. **Images** (≈ 1–2 h) : utiliser `next/image` pour les miniatures YouTube (LessonForm) et les images statiques là où c’est pertinent ; vérifier les tailles et formats.
10. **CI/CD** (≈ 2 h) : ajouter un workflow (ex. GitHub Actions) pour lint + build sur chaque push/PR.
11. **Nettoyage ESLint** (≈ 1 h) : corriger les warnings restants (imports inutilisés, etc.) pour un lint sans warning.

### Priorité 4 — Évolutions futures (roadmap)

- Tests automatisés (e2e Playwright/Cypress sur parcours critique : inscription → choix forfait → paiement → accès cours).
- Monitoring et alertes (erreurs 5xx, échecs webhook, crons).
- Cache / ISR sur les pages blog et listes de cours si le trafic augmente.
- Possibilité de désinscription / gestion des préférences emails (RGPD).
- Tableau de bord élève enrichi (certificats, objectifs, rappels).

---

## 12. RÉSUMÉ EXÉCUTIF

Le projet **Qalam** est dans un état **prêt pour une mise en production maîtrisée** : architecture Next.js 16 claire, stack moderne (Clerk, Stripe, Supabase, Sanity, Resend), trois espaces (public, membre, admin/professeur) fonctionnels avec RBAC (multi-admin, prof par univers, élève par forfait, expiration abonnement, logs d’accès). La qualité du code est bonne (TypeScript propre, pas de `any`, pas de `console.log` inutiles), la sécurité est soignée (middleware, requireAdmin/requireProf, webhook signé, env documentée). Les principaux points à traiter avant ou juste après la mise en ligne sont le **durcissement du webhook Stripe** (alertes en cas d’échec insert, idempotence explicite), la **vérification des schémas et variables d’environnement** en production, et un **effort ciblé sur l’accessibilité et la validation des API**. La dette technique reste limitée (TODO CPF, types dans mock-courses, quelques warnings ESLint). Avec le plan d’action priorisé (Priorité 1 en premier), une **mise en ligne commerciale** peut être envisagée sous **quelques jours à une semaine**, en gardant les Priorité 2 et 3 pour la première quinzaine et le premier mois.
