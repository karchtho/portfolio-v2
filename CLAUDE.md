# CLAUDE.md — Portfolio Angular (Thomas)

## 🎯 Contexte du projet

Portfolio personnel full-stack :
- **Frontend** : Angular 21 (standalone, signals, zoneless par défaut, Vitest)
- **Backend** : Node.js + Express (API REST custom)
- **Base de données** : MySQL (requêtes SQL brutes via mysql2)
- **Styling** : SCSS custom
- **Tests** : Intégrés dès le début (Vitest côté Angular, Jest/Vitest côté Node)
- **Déploiement** : Docker → VPS OVH

### Objectifs à terme
- Afficher et gérer des articles/projets
- Admin panel pour CRUD des contenus
- Héberger des projets annexes (apps LAMP, serveur MCP) via Docker

---

## 🧑‍🏫 Mode d'interaction : Enseignant

### Principes
1. **Expliquer avant de montrer** : chaque concept est introduit avec le "pourquoi" avant le "comment"
2. **Guider, pas autocompléter** : donner des bouts de code à copier/adapter, mais Thomas écrit lui-même
3. **Donner du code quand nécessaire** : pas d'hésitation à fournir des snippets à copier, mais pas de fichiers entiers générés automatiquement
4. **Valider la compréhension** : poser des questions, proposer des mini-défis
5. **Bonnes pratiques 2025** : Angular 21 (standalone, signals, zoneless), TypeScript strict, ESLint, tests systématiques

### Format des réponses
- Expliquer le concept ou l'étape
- Donner le code à copier si nécessaire
- Indiquer où le placer et pourquoi
- Proposer un "checkpoint" pour vérifier que ça marche
- Inclure les tests correspondants quand pertinent

### Préférences d'exécution
- **Thomas exécute lui-même les commandes** : donner les commandes à copier, pas les exécuter automatiquement
- Fournir : la commande, les étapes, les résultats attendus
- Thomas interrompra si besoin d'aide ou si erreur

### Ce qu'on évite
- Générer des fichiers complets sans explication
- Autocomplétion ou scaffolding massif
- Sauter des étapes "parce que c'est évident"
- Exécuter des commandes sans demander (sauf recherche/lecture de code)

---

## 📁 Structure prévue du projet

```
portfolio/
├── frontend/                 # Angular 21
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Composants standalone réutilisables
│   │   │   ├── pages/        # Pages/routes (lazy loaded)
│   │   │   ├── services/     # Services (API calls)
│   │   │   ├── models/       # Interfaces TypeScript
│   │   │   └── utils/        # Helpers, fonctions utilitaires
│   │   ├── styles/           # SCSS globaux, variables, mixins
│   │   └── environments/
│   ├── Dockerfile
│   └── vitest.config.ts
│
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/         # Logique métier
│   │   ├── repositories/     # Accès SQL (mysql2)
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   └── Dockerfile
│
├── database/
│   ├── migrations/           # Scripts SQL versionnés
│   └── seeds/                # Données de test
│
├── docker-compose.yml        # Orchestration dev
├── docker-compose.prod.yml   # Orchestration prod
├── .env.example
└── README.md
```

---

## 🛤️ Roadmap (ordre suggéré)

### Phase 1 : Setup environnement ✅
- [x] Initialiser le repo Git avec .gitignore approprié
- [x] Installer Angular CLI v21, créer le projet frontend (zoneless, SCSS, Vitest)
- [x] Initialiser le projet Node/Express backend avec TypeScript
- [x] Setup Docker (Dockerfiles + docker-compose avec MySQL)
- [x] Vérifier que tout tourne en local
- [ ] Premier test qui passe (front + back) — *À valider*

### Phase 2 : Backend API ✅
- [x] Structure Express (routes, controllers, services, repositories)
- [x] Connexion MySQL avec mysql2 (pool de connexions)
- [x] Premières migrations SQL
- [x] CRUD projets : endpoints REST
- [x] Environment variables refactoring (backend/.env structure)
- [x] Docker secrets support (production-ready with secrets.ts)
- [x] Angular runtime configuration (build once, deploy anywhere)
- [x] Docker dev & prod environments fully functional
- [ ] Validation des données (express-validator ou Zod)
- [ ] Gestion d'erreurs centralisée
- [ ] Tests unitaires des repositories et controllers

### Phase 3 : Frontend Angular ✅
- [x] Comprendre les standalone components
- [x] Composant Button réutilisable (variant system, SCSS modulaire)
- [x] Composant ProjectCard (affichage des projets)
- [x] Routing avec lazy loading (Layout parent + children routes)
- [x] Service HTTP pour appeler l'API (ProjectsService avec HttpClient)
- [x] Signals pour la gestion d'état (projects, loading, error signals)
- [x] Afficher la liste des projets depuis l'API (Projects page opérationnelle)
- [x] Theme Service (light/dark/auto avec localStorage)
- [ ] Page Home (hero + featured projects)
- [ ] Page détail d'un projet (avec carousel d'images)
- [ ] Tests des composants avec Vitest

### Phase 3.5 : Layout & Navigation (EN COURS)
- [x] Composant Layout (wrapper avec navbar + router-outlet + footer)
- [ ] Navbar component (navigation + theme toggle + responsive menu)
- [ ] Footer component (copyright + social links)
- [ ] Page Home (hero section + featured projects + CTA)

### Phase 4 : Intégration & Style
- [x] Connexion front ↔ back (environnements, proxy dev)
- [x] Architecture SCSS (tokens OKLCH, themes, utilities) — *Système complet implémenté*
- [ ] Design responsive mobile-first
- [ ] Animations de base

### Phase 5 : Admin Panel
- [ ] Authentification JWT (login, tokens, refresh)
- [ ] Guards Angular pour routes protégées
- [ ] Interface CRUD admin
- [ ] Upload d'images (Multer + stockage fichier local, voir section Images)

### Phase 6 : Déploiement OVH
- [x] Docker Compose production optimisé — *docker-compose.prod.yml avec secrets*
- [ ] Reverse proxy (Nginx ou Traefik)
- [ ] HTTPS avec Let's Encrypt
- [ ] CI/CD avec GitHub Actions
- [x] Variables d'environnement sécurisées — *Docker secrets configurés*

### Phase 7 : Hébergement projets annexes
- [ ] Containeriser les projets LAMP existants
- [ ] Intégrer au docker-compose global
- [ ] Configuration sous-domaines ou chemins
- [ ] Monitoring basique

---

## 🌐 Langue

Tout le projet est en **anglais** :
- Code (variables, fonctions, classes)
- Commits et messages Git
- Commentaires et documentation
- Contenu du site (textes, articles)
- README et docs techniques

Les échanges dans Claude Code peuvent rester en français.

---

## 📚 Conventions de code

### TypeScript (front & back)
- **Strict mode** activé (`"strict": true`)
- Interfaces/types pour tous les modèles de données
- Pas de `any` sauf cas exceptionnel documenté
- Préférer `unknown` à `any` quand le type est vraiment inconnu

### Angular 21
- **Standalone components** uniquement (c'est le défaut maintenant)
- **Signals** pour l'état réactif (signal, computed, effect)
- **Zoneless** par défaut (pas de zone.js)
- Lazy loading systématique des routes
- Services injectés via `inject()` plutôt que constructor DI
- Tests avec **Vitest** (intégré par défaut dans CLI v21)

### SCSS
- Variables dans `_variables.scss`
- Mixins réutilisables dans `_mixins.scss`
- Approche BEM pour le nommage des classes
- Mobile-first (media queries min-width)

### Express / Node
- Architecture en couches : routes → controllers → services → repositories
- Repositories pour isoler l'accès SQL
- Middleware pour auth, validation, error handling
- Variables d'environnement via dotenv
- Tests avec Jest ou Vitest

### SQL (mysql2)
- Requêtes préparées systématiquement (sécurité injection SQL)
- Migrations versionnées dans `database/migrations/`
- Nommage : snake_case pour tables et colonnes
- Transactions pour opérations multiples

### Git
- Commits conventionnels : `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Branches : `main` (prod), `develop`, `feature/*`, `fix/*`
- PR obligatoires pour merge sur main (quand applicable)
- **Pas de co-authoring** : ne pas ajouter de mention `Co-authored-by` dans les commits (c'est le projet de Thomas, Claude est un outil d'assistance)

### Docker
- Multi-stage builds pour images optimisées
- Un service = un container
- Volumes nommés pour persistance MySQL
- Networks dédiés pour isolation

### Tests
- Écrire le test en même temps que la feature
- Nommage : `*.spec.ts` pour Angular, `*.test.ts` pour Node
- Coverage minimal visé : 70%

---

## 🔧 Stack technique détaillée

### Frontend
- Angular 21
- TypeScript 5.8+
- SCSS
- Vitest + Testing Library
- ESLint + Prettier

### Backend
- Node.js 22 LTS
- Express 5.x
- TypeScript 5.8+
- mysql2 (avec pool)
- express-validator ou Zod
- Jest ou Vitest
- ESLint + Prettier

### Infrastructure
- Docker + Docker Compose
- MySQL 8
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)

---

## 🚀 Prochaine étape

**Phase 3.5 — Layout & Navigation : Navbar + Footer + Home**

Layout component créé avec routing parent/children ! Prochaines étapes :

1. **Navbar component** — navigation links + theme toggle + mobile menu
2. **Footer component** — copyright + social links
3. **Page Home** — hero section + featured projects + CTA
4. **Refactoring** — optimiser Projects page avec effects au lieu de OnInit

**État actuel :**
- ✅ Layout wrapper (navbar + router-outlet) en place
- ✅ Routing restructuré avec lazy loading
- ⏳ Navbar est un stub vide (à implémenter)
- ❌ Footer n'existe pas encore
- ❌ Page Home n'existe pas encore

Objectif : compléter la structure de navigation et créer la page d'accueil.

---

## 📝 Notes techniques importantes

### Environment Variables Architecture (Décembre 2025)

**Structure finale implémentée :**
```
backend/
  .env            # Docker Compose (committed with dev-safe values)
  .env.local      # Local npm run dev (gitignored)
  .env.example    # Template (committed)
```

**Principes clés :**
- **Dev local** : `npm run dev` charge `backend/.env.local` via dotenv
- **Dev Docker** : Compose utilise `backend/.env` via `env_file:`
- **Production** : Docker secrets montés dans `/run/secrets/` (lecture via `secrets.ts`)
- **Frontend** : Runtime config injection via `generate-config.sh` → `config.js` (build once, deploy anywhere)

**Leçons apprennées :**
- MySQL auto-escape les underscores dans `MYSQL_DATABASE` lors de la création de users → éviter les `_` dans les noms de DB
- `env_file:` dans docker-compose ne permet pas la substitution `${}` dans `environment:` → hardcoder les valeurs pour MySQL
- SSL désactivé pour réseau Docker interne (même serveur) est sécurisé
- Angular `environment.ts` = build-time → utiliser runtime injection pour vraie flexibilité

**Documentation complète :**
- Setup & troubleshooting : [docs/SETUP.md](docs/SETUP.md)
- Secrets management guide : [docs/technical/secrets-management-guide.md](docs/technical/secrets-management-guide.md)

### Gestion des images (Décembre 2025)

**Stratégie retenue : Stockage fichier local + chemin DB**

**Architecture :**
- Images uploadées → `backend/uploads/projects/`
- DB stocke les chemins relatifs dans colonne JSON `images`
- Une image `thumbnail` principale pour les cards
- Galerie d'images pour le carousel sur page détail

**Stack technique :**
- **Multer** (middleware Express pour upload multipart/form-data)
- Volume Docker `uploads-data` pour persistance
- Route statique Express : `/uploads` → `backend/uploads/`
- Limite : 5 MB par image, formats JPEG/PNG/WebP/GIF

**Structure SQL :**
```sql
CREATE TABLE projects (
  ...
  thumbnail VARCHAR(500),        -- Image principale (cards)
  images JSON DEFAULT NULL,      -- ["uploads/projects/img1.jpg", ...]
  ...
);
```

**Workflow prévu :**
1. Admin drag & drop des images
2. Upload via POST `/api/upload/projects` (retourne les chemins)
3. Frontend récupère les chemins et les stocke en créant/éditant le projet
4. Cards affichent `thumbnail`
5. Page détail affiche carousel avec toutes les `images`

**Alternatives considérées (non retenues pour v1) :**
- Base64 en DB → gonfle la DB, mauvaises performances
- Cloud S3/Cloudinary → coût, complexité, non nécessaire pour un portfolio

---

## 📦 État actuel du projet (Décembre 2025)

### Frontend (Angular 21)
**Composants créés :**
- ✅ **Button** — variant system (primary/secondary/ghost), sizes, routing/href support
- ✅ **ProjectCard** — affichage projet avec thumbnail, description, tech badges, links
- ✅ **Layout** — wrapper global avec navbar + router-outlet + footer placeholder
- ⚠️ **Navbar** — stub vide (à implémenter)

**Pages créées :**
- ✅ **Projects** — liste tous les projets depuis l'API avec loading/error states
- ❌ **Home** — à créer (hero + featured projects)
- ❌ **Project Detail** — à créer (carousel d'images)

**Services implémentés :**
- ✅ **ProjectsService** — HTTP client + signal state (projects, loading, error)
- ✅ **ThemeService** — light/dark/auto avec localStorage et system preference
- ✅ **ConfigService** — runtime API URL injection (build once, deploy anywhere)

**Styling :**
- ✅ Système OKLCH complet (tokens + themes light/dark)
- ✅ Fonts custom (Poppins, Source Sans 3, Fira Code)
- ✅ Utilities CSS (container, card, shadows, etc.)

**Routing :**
- ✅ Layout parent avec children routes (lazy loading)
- ✅ `/projects` opérationnel
- ⚠️ `/home` configuré mais page non créée

### Backend (Node.js + Express)
- ✅ CRUD projects complet (GET /api/projects, GET /api/projects/:id)
- ✅ MySQL avec mysql2 (connexions pool)
- ✅ Migrations + seeds fonctionnels
- ✅ Docker secrets support (production-ready)

### Infrastructure
- ✅ Docker Compose dev + prod
- ✅ MySQL 8 avec persistance
- ✅ Runtime config injection (frontend + backend)
- ✅ Proxy dev configuré

---

*Dernière mise à jour : 4 Décembre 2025 — Phase 3.5 en cours (Layout créé, Navbar à implémenter)*
