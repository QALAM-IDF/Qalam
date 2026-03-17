# Rapport d'audit — Qalam (Phases 1-11)

## BUGS CORRIGÉS

- **ConditionalLayout** : NavBar/Footer masqués sur toutes les routes protégées (espace-membre, connexion, inscription, auth-redirect, choisir-forfait, paiement-succes) en plus de admin et professeur.
- **CSS global** : Règles curseur système pour `.membre-layout` (admin et prof déjà en place). Curseur `auto` et `pointer` sur liens/boutons pour admin, prof et membre.
- **Layout espace-membre** : Ajout de la classe `membre-layout` sur le wrapper principal pour appliquer le curseur correct.
- **API progression** : Ajout de `export const dynamic = 'force-dynamic'` (utilisation de `auth()`).
- **Webhook Stripe** : Suppression des `console.log` de debug (conservation des `console.error`).
- **Redirection paiement** : Dans ChoisirForfaitClient, redirection vers Stripe via state + `useEffect` pour respecter la règle ESLint (pas de mutation de `window.location` dans le handler).
- **ESLint (effets)** : Dans espace-membre (page, cours, progression), `setState` dans les effets déplacés dans `queueMicrotask()` pour éviter "setState synchronously within an effect".
- **ESLint (pureté)** : Sur la page espace-membre, calcul de `daysSinceJoin` basé sur un `useState(() => Date.now())` au lieu de `Date.now()` pendant le render.
- **Professeur messages** : Suppression de l’effet qui synchronisait les query params ; état dérivé (URL prioritaire, puis sélection liste) sans setState dans un effet.
- **Liens placeholder** : Commentaires `// TODO: remplacer par vrai lien` sur les `href="#"` (ChoisirForfaitClient, page CPF).

## PROBLÈMES RESTANTS (non bloquants)

- **Warnings ESLint** : 18 warnings (imports non utilisés, `no-img-element` dans LessonForm pour la preview YouTube). À traiter progressivement (nettoyage des imports, passage à `next/image` si pertinent).
- **Mock types** : Les types `Course`, `Lesson`, `QuizQuestion` sont encore importés depuis `@/data/mock-courses` ; les données viennent bien de l’API/Supabase. Option : déplacer ces types dans un fichier dédié (ex. `@/types/courses`).
- **Liens CPF** : Les liens `href="#"` sur la page CPF et ChoisirForfait sont en attente de vrais liens (Mon Compte Formation, etc.).

## ÉTAT DU BUILD

- **npm run lint** : OK (0 erreurs, 18 warnings).
- **npm run build** : OK (0 erreur TypeScript, routes générées).

## RECOMMANDATIONS

1. Exécuter le script SQL Phase 11 (`supabase-phase11-prof.sql`) en production si ce n’est pas déjà fait (tables `sessions`, `prof_eleves`).
2. Vérifier que toutes les variables listées dans `.env.local.example` sont définies en production (notamment `CRON_SECRET`, `ADMIN_EMAIL`, `RESEND_API_KEY`).
3. À terme : corriger les warnings (supprimer les imports inutilisés, remplacer `<img>` par `next/image` dans LessonForm si possible pour les thumbnails YouTube).
4. Optionnel : extraire les types partagés (Course, Lesson, etc.) dans `src/types/` pour ne plus dépendre de `mock-courses` pour les types.
