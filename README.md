# Liqtrade Demo

Bonjour l'équipe TX Studio ! 👋

Voici le projet que j'ai développé pour votre test technique.

J'ai fait de mon mieux pour respecter toutes les fonctionnalités demandées et suivre au maximum vos maquettes. L'objectif était de créer une interface performante et maintenable, avec une architecture backend flexible et sécurisée. J'espère que le résultat vous plaira !

**Note** : J'ai push les fichiers `.env` dans le dépôt, c'est pas une erreur, c'était histoire de facilliter l'installation. 😄

Si vous rencontrez le moindre problème lors de l'installation, n'hésitez pas à me contacter !

---

## 🚀 Démarrage rapide

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

### Prérequis

- **Docker** (pour la db postgres)
- **Make** (pour les commandes automatisées)
- **Git** (pour cloner le projet)
- **Bun** et **npm** (gestionnaires de packages)

### Installation

1. **Cloner le dépôt**

   ```bash
   git clone git@github.com:Noe-p/test-txstudio.git && cd test-txstudio
   ```

2. **Installer les dépendances**

   Depuis la racine du projet :

   ```bash
   make install
   ```

3. **Démarrer Docker**

   Assurez-vous que Docker est bien lancé sur votre machine.

4. **Lancer le backend (Strapi)**

   ```bash
   make dev.strapi
   ```

   Répondre **'Yes'** à ce message :

   > The import will delete your existing data! Are you sure you want to proceed?

5. **Lancer le frontend (dans un autre terminal)**

   ```bash
   make dev.front
   ```

Et voilà ! L'application devrait maintenant être accessible.

### Accès à l'application

Une fois lancée, vous pouvez accéder à :

- **Application front** : [http://localhost:3000](http://localhost:3000)
- **Admin Strapi** : [http://localhost:1337/admin](http://localhost:1337/admin)

Lors du premier accès à l'admin Strapi, la page d'inscription s'affichera pour vous permettre de créer votre compte administrateur.

**Pour acceder au dashboard depuis le front**, utilisez les identifiants suivants :

- **Email** : i.alexis@tx-studio.com
- **Mot de passe** : Ismael!9

## 🛠️ Stack technique

Voici les technologies que nous avons choisies pour ce projet :

### Frontend

- **Framework** : **Next.js** – Framework React moderne pour des performances optimales avec support SSR/SSG natif
- **Langage** : **TypeScript** – Pour une meilleure qualité de code et prévention des erreurs
- **Styling** : **Tailwind CSS** – Framework CSS utility-first pour un développement rapide et cohérent
- **Composants** : **Shadcn/ui** – Bibliothèque de composants réutilisables basée sur Radix UI
- **État et requêtes** : **Tanstack Query** – Gestion performante des données asynchrones côté client
- **Internationalisation** : **next-intl** – Pour supporter plusieurs langues (français disponible pour l'instant)
- **Icônes** : **Lucide** – Ensemble complet d'icônes modernes et accessibles
- **Graphiques** : **Recharts** – Visualisations de données interactives et réactives

### Backend

- **CMS** : **Strapi V5** – CMS headless puissant pour la gestion complète du contenu
- **Base de données** : **PostgreSQL** – Base de données relationnelle robuste et performante (Note : MongoDB n'était pas compatible avec Strapi V5)
- **Containerisation** : **Docker** – Pour simplifier le déploiement et assurer la cohérence entre développement et production

## 📖 Architecture

### Frontend

```plaintext
frontend/
├── public/               # Assets publics (icônes, images)
├── src/
│   ├── app/              # Pages et routes de l'application
│   ├── components/       # Composants réutilisables
│   │   ├── Charts/       # Graphiques et visualisations
│   │   ├── Dashboard/    # Composants du dashboard
│   │   ├── Homepage/     # Composants de la page d'accueil
│   │   ├── ui/           # Composants UI génériques (boutons, cartes, etc.)
│   │   └── utils/        # Composants utilitaires
│   ├── contexts/         # Contextes React pour l'état global
│   ├── hooks/            # Hooks personnalisés
│   ├── i18n/             # Configuration de l'internationalisation
│   ├── providers/        # Fournisseurs (QueryProvider, etc.)
│   ├── services/         # Services API et utilitaires
│   ├── static/           # Constantes et styles globaux
│   └── types/            # Types TypeScript générés
├── .env                  # Variables d'environnement
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Backend (Strapi)

Notre back-office Strapi gère trois collections principales :

**HomePage** – Contient tout le contenu de la page d'accueil :

- Header (logo, navigation)
- Sections d'avantages et services
- Images et CTA

**DashboardPage** – Contient les données du tableau de bord :

- Informations utilisateur (nom, segment, score de risque)
- Graphique financier
- Tableaux d'Euribor, transactions et prêts

**Configuration** – Paramètres globaux :

- Logo et branding

**User** – Gestion des utilisateurs :

- Authentification JWT
- Rôles et permissions

### 🔐 Sécurité

La sécurité de l'application repose sur :

- **Clés API** – Tous les appels vers Strapi sont sécurisés avec une clé API
- **Authentification** – L'accès au dashboard nécessite une connexion utilisateur
- **Données protégées** – Les informations sensibles ne sont visibles que par les utilisateurs autorisés

## 📝 Développement et fonctionnalités

### Ce qui a bien fonctionné

✅ **Aucun bug bloquant** – Le projet s'est déroulé sans blocages majeurs

### Les défis rencontrés

Le principal défi a été de **déterminer la structure des données** : comprendre quelles informations étaient statiques et lesquelles devaient être gérées dynamiquement via Strapi. Par exemple, pour les prêts sur la page 2, cela a nécessité plusieurs ajustements des schémas Strapi.

### Fonctionnalités implémentées

**Authentification** – Page de login sécurisée avec gestion de session

**Performance** – Page d'accueil générée statiquement au build (zéro temps de chargement)

**Multilingue** – Support de l'internationalisation via `next-intl` (français inclus)

**Composants modulaires** – Architecture réutilisable et maintenable

**Données dynamiques** – Toutes les informations du dashboard et de l'accueil proviennent de Strapi

**Déconnexion** – Gestion complète de la session utilisateur

**Responsive** – Interface optimisée pour tous les appareils (mobile, tablet, desktop)

### 🚀 Améliorations futures

Pour approfondir le projet :

- **Inscription (Register)** – Ajouter une page d'inscription complète
- **Récupération de mot de passe** – Implémenter un flux "mot de passe oublié"
- **Données personnalisées** – Le dashboard affiche actuellement des données statiques, les faire correspondre aux données réelles de chaque utilisateur
- **Tests automatisés** – Ajouter des tests unitaires (Jest) et des tests d'intégration pour assurer la qualité du code
- **Tests E2E** – Implémenter des tests end-to-end avec Cypress ou Playwright pour valider les parcours utilisateur
- **Couverture de tests** – Viser une couverture minimale de 80% pour les composants critiques
