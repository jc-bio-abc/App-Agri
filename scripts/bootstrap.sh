#!/usr/bin/env bash
set -euo pipefail

# Vérification des outils
node -v
npm -v
git --version

if ! command -v ng >/dev/null 2>&1; then
  echo "Angular CLI non trouvé. Installation globale..."
  npm install -g @angular/cli
fi

git init

git config user.name "${GIT_USER:-Votre Nom}"
git config user.email "${GIT_MAIL:-votre.email@example.com}"

ng new app-agri --routing --style=scss --directory . --skip-git

npm install

ng add @angular/material --skip-confirmation

npm install leaflet leaflet-draw @types/leaflet @types/leaflet-draw --no-audit --no-fund
npm install @ngx-translate/core @ngx-translate/http-loader --no-audit --no-fund

MODULES=(
  "pages/dashboard dashboard"
  "pages/fields parcelles"
  "pages/planning planification"
  "pages/activities activites"
  "pages/warehouses entrepots"
  "pages/products produits"
  "pages/seeds semences"
)

for entry in "${MODULES[@]}"; do
  read -r path route <<<"$entry"
  ng g module "$path" --route "$route" --module app.module
done

mkdir -p src/app/core/services src/app/core/models

cat <<'AUTH' > src/app/core/services/auth.service.ts
export class AuthService {
  // mock roles: admin, gestionnaire, operateur, client-eta, lecture-seule
  getCurrentUser() {
    return { name: 'Jean-Charles', roles: ['admin'] };
  }
}
AUTH

cat <<'CTX' > src/app/core/services/context.service.ts
export class ContextService {
  // gestion du contexte exploitation (mock)
  getCurrentContext() {
    return { organisation: null, exploitations: [] };
  }
}
CTX

cat <<'DOC' > README.md
# App-Agri (bootstrap)
Projet Angular initialisé avec Material, Leaflet, ngx-translate.
## Scripts
- npm start -> ng serve
- npm run build -> ng build
- npm run lint -> ng lint
## Structure
modules lazy: dashboard, parcelles, planification, activites, entrepots, produits, semences
DOC

node - <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts.start = 'ng serve';
pkg.scripts.build = 'ng build';
pkg.scripts.lint = 'ng lint';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
NODE

GIT_BRANCH="${GIT_BRANCH:-feat/init-angular}"

if ! git rev-parse --verify "$GIT_BRANCH" >/dev/null 2>&1; then
  git checkout -b "$GIT_BRANCH"
else
  git checkout "$GIT_BRANCH"
fi

git add .
git commit -m "chore: bootstrap Angular app with Material, Leaflet, i18n and modular routing"

echo "Script terminé. Pensez à pousser la branche \"$GIT_BRANCH\" vers votre remote HTTPS."
