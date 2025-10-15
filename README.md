# App-Agri

Initialisation prévue d'une application Angular pour la gestion d'exploitations agricoles.

## Objectifs du projet

- Fournir une base Angular avec Angular Material, Leaflet et ngx-translate préinstallés.
- Mettre en place un routage modulaire pour les différentes pages métier (tableau de bord, parcelles, planification, etc.).
- Préparer une structure `core/services` pour centraliser les services d'authentification et de contexte.

## Mise en place de l'environnement

L'initialisation complète repose sur l'Angular CLI. Dans un environnement disposant d'un accès au registre npm, on peut installer les dépendances globales nécessaires :

```bash
npm install -g @angular/cli
```

> **Note :** dans des environnements restreints (comme la plateforme de correction), l'installation globale peut échouer faute d'accès réseau. Les étapes suivantes peuvent néanmoins être exécutées depuis une machine locale disposant d'un accès Internet.

## Script d'initialisation suggéré

Le script ci-dessous reprend les différentes étapes pour créer la base du projet. Il reprend l'automatisation utilisée lors des tests locaux en remplaçant les valeurs sensibles par des variables d'environnement.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Vérification des outils
node -v
npm -v
git --version

# Installation éventuelle de l'Angular CLI
if ! command -v ng >/dev/null 2>&1; then
  npm install -g @angular/cli
fi

# Configuration Git
PROJECT_DIR="app-agri"
GIT_USER="Votre Nom"
GIT_MAIL="votre.email@example.com"

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

git init

git config user.name "$GIT_USER"
git config user.email "$GIT_MAIL"

# Création du projet Angular dans le répertoire courant
ng new app-agri --routing --style=scss --directory . --skip-git

# Installation des dépendances complémentaires
npm install
ng add @angular/material --skip-confirmation
npm install leaflet leaflet-draw @types/leaflet @types/leaflet-draw --no-audit --no-fund
npm install @ngx-translate/core @ngx-translate/http-loader --no-audit --no-fund

# Génération des modules lazy-loaded
ng g module pages/dashboard --route dashboard --module app.module
ng g module pages/fields --route parcelles --module app.module
ng g module pages/planning --route planification --module app.module
ng g module pages/activities --route activites --module app.module
ng g module pages/warehouses --route entrepots --module app.module
ng g module pages/products --route produits --module app.module
ng g module pages/seeds --route semences --module app.module

# Préparation des services
mkdir -p src/app/core/services src/app/core/models
cat <<'SERV' > src/app/core/services/auth.service.ts
export class AuthService {
  getCurrentUser() {
    return { name: 'Jean-Charles', roles: ['admin'] };
  }
}
SERV

cat <<'SERV' > src/app/core/services/context.service.ts
export class ContextService {
  getCurrentContext() {
    return { organisation: null, exploitations: [] };
  }
}
SERV

# Mise à jour du README
cat <<'DOC' > README.md
# App-Agri

Projet Angular initialisé avec Material, Leaflet et ngx-translate.

## Scripts
- \\`npm start\\` → lance `ng serve`
- \\`npm run build\\` → lance `ng build`
- \\`npm run lint\\` → lance `ng lint`
DOC

# Configuration des scripts npm
node - <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts.start = 'ng serve';
pkg.scripts.build = 'ng build';
pkg.scripts.lint = 'ng lint';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
NODE

# Commit initial
git add .
git commit -m "chore: bootstrap Angular app"
```

## Prochaines étapes

- Implémenter réellement la génération du projet (lorsque l'accès au registre npm est possible) afin que le dépôt contienne le code source Angular complet.
- Ajouter des tests unitaires et d'intégration.
- Définir un pipeline CI pour vérifier la compilation et les linters.
```
