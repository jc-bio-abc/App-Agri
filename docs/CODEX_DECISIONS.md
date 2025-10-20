# Journal des décisions (Codex)

> Ce fichier liste les décisions techniques que Codex a prises sur ce dépôt.
> Chaque entrée documente un raisonnement, les alternatives envisagées, les fichiers modifiés et les prochaines étapes.

## Modèle d'entrée

### [YYYY-MM-DD] <Titre court>
**Contexte**  
- Problème / besoin initial :
- Zone de code concernée :
- Contrainte(s) (versions, libs, CI/CD, sécurité, etc.) :

**Décision**  
- Changement(s) effectué(s) :
- Alternatives envisagées (et raisons du rejet) :
- Risques / impact / compat :

**Détails d’implémentation**  
- Fichiers modifiés :
- Commandes exécutées :
- Résultat du build/test :

**Étapes suivantes**  
- Actions à planifier :
- TODO / suivis :

---

## Entrées
<!-- Les nouvelles entrées sont ajoutées en haut -->

### [2025-10-20] Résolution finale conflits PR #4
**Contexte**
- Problème / besoin initial : Conflits persistants sur la PR #4 entre la branche de travail et main, accompagnés d'erreurs Angular (imports Material manquants, bindings obsolètes) empêchant le build.
- Zone de code concernée : angular.json, app.component/app.module, modules des pages (fields, dashboard, activities, planning, products, seeds, warehouses) et template entrepôts.
- Contrainte(s) (versions, libs, CI/CD, sécurité, etc.) : Compatibilité Angular 17 avec lazy loading, strict mode TypeScript, respect du guard Codex et build `ng build` sans échec.

**Décision**
- Changement(s) effectué(s) : Nettoyage de l'app shell pour ne conserver que le router-outlet, normalisation des modules pour importer les dépendances Angular/Material requises, ajout des modules Material oubliés (list, expansion, toolbar) et correction des bindings Material.
- Alternatives envisagées (et raisons du rejet) : Revenir à la structure multi-layout précédente (rejeté pour éviter de rouvrir les conflits UI) ; ignorer les avertissements Material en supprimant les composants concernés (rejeté pour conserver la couverture fonctionnelle).
- Risques / impact / compat : Duplication d'import Material dans plusieurs modules (à mutualiser plus tard) et avertissement CommonJS Leaflet à suivre.

**Détails d’implémentation**
- Fichiers modifiés : angular.json, src/app/app.component.ts, src/app/app.module.ts, src/app/pages/*/*.module.ts, src/app/pages/fields/fields.module.ts, src/app/pages/fields/components/field-attachments/field-attachments.component.html, src/app/pages/warehouses/warehouses.component.html.
- Commandes exécutées : npm install ; CI=1 NG_CLI_ANALYTICS=false npx ng build --verbose.
- Résultat du build/test : Build Angular réussi (avertissement CommonJS Leaflet acceptable).

**Étapes suivantes**
- Actions à planifier : Mutualiser les modules Material partagés et traiter l'avertissement CommonJS via configuration allowedCommonJsDependencies.
- TODO / suivis : Vérifier via CI Codex Decision Guard que les journaux sont bien pris en compte et surveiller la taille des bundles.

### [2025-10-20] Résolution conflits PR #4 et build Fields
**Contexte**
- Problème / besoin initial : La branche de la PR #4 présentait des conflits sur le module `fields` et le composant `warehouses`, empêchant le merge et bloquant le build Angular.
- Zone de code concernée : `src/app/pages/fields/**`, `src/app/pages/warehouses/warehouses.component.html`, `src/app/app.component.ts`, modules de fonctionnalités (`dashboard`, `activities`, `planning`, `products`, `seeds`, `warehouses`).
- Contrainte(s) (versions, libs, CI/CD, sécurité, etc.) : TypeScript strict avec Angular 17, respect du lazy loading, compatibilité Angular Material/ngx-translate, exécution `ng build` réussie malgré les dépendances CommonJS (Leaflet).

**Décision**
- Changement(s) effectué(s) : Harmonisation des classes suffixées `PageComponent` dans le routing/lazy module, corrections des bindings Material, ajout systématique de `TranslateModule` dans les modules de pages, adoption d'`inject()` pour éliminer les initialisations avant injection, ajout des modules Material manquants et mise à jour des formulaires réactifs.
- Alternatives envisagées (et raisons du rejet) : Revenir à des composants standalone (rejeté pour limiter l’ampleur de refactor), désactiver la vérification stricte TypeScript (rejeté pour préserver la robustesse), supprimer les fonctionnalités utilisant Leaflet (rejeté car hors périmètre fonctionnel).
- Risques / impact / compat : Build plus lourd (avertissement budget initial), dépendance Leaflet signalée en CommonJS mais acceptable à court terme ; nécessite suivi si budgets doivent être optimisés.

**Détails d’implémentation**
- Fichiers modifiés : `src/app/pages/fields/fields-routing.module.ts`, `src/app/pages/fields/fields.module.ts`, `src/app/pages/fields/pages/**/*.ts`, `src/app/pages/fields/components/**/*`, `src/app/pages/*/*.module.ts`, `src/app/pages/warehouses/warehouses.component.html`, `src/app/app.component.ts`, `docs/CODEX_DECISIONS.md`, `docs/codex-log.jsonl`.
- Commandes exécutées : `npm install`, `CI=1 NG_CLI_ANALYTICS=false npx ng build --verbose`.
- Résultat du build/test : `ng build` réussi avec avertissements (Leaflet CommonJS, budget initial).

**Étapes suivantes**
- Actions à planifier : Surveiller l’avertissement de dépendance CommonJS Leaflet et le budget bundle ; prévoir une optimisation ultérieure.
- TODO / suivis : Valider via PR que les traductions sont complètes et envisager un partage de modules Material/Translate communs.

### [2025-10-20] Ajout du système de traçabilité Codex
**Contexte**  
- Problème / besoin initial : Absence de processus structuré pour tracer les décisions techniques prises par Codex.  
- Zone de code concernée : Documentation (`docs/`), automatisation CI (`.github/workflows/`), scripts d'outillage (`scripts/`).  
- Contrainte(s) (versions, libs, CI/CD, sécurité, etc.) : Nécessité d'une vérification CI bloquante, compatibilité GitHub Actions, dépendance à Node.js 20.

**Décision**  
- Changement(s) effectué(s) : Création des journaux Codex (Markdown et JSONL), ajout de scripts CLI pour journaliser, mise en place d'un template ADR et d'un modèle de PR, ajout d'une GitHub Action bloquant les changements de code sans mise à jour des journaux.  
- Alternatives envisagées (et raisons du rejet) : Utiliser un outil externe de traçabilité (rejeté pour éviter les dépendances externes) ; vérifier manuellement les journaux lors des revues (rejeté car non automatisable).  
- Risques / impact / compat : Risque faible mais nécessite l'installation de `jq` pour le script shell ; la CI échouera si les journaux ne sont pas maintenus à jour.

**Détails d’implémentation**  
- Fichiers modifiés : `.github/pull_request_template.md`, `.github/workflows/codex-decision-guard.yml`, `.github/workflows/verify-codex-logs.js`, `docs/CODEX_DECISIONS.md`, `docs/codex-log.jsonl`, `docs/adr/0000-template.md`, `scripts/codex-log.sh`, `scripts/codex-log.ps1`.  
- Commandes exécutées : Création de fichiers via redirections shell (`cat <<'EOF' > file`), `mkdir -p` pour initialiser les dossiers.  
- Résultat du build/test : Non exécuté (changement documentaire/CI uniquement).

**Étapes suivantes**  
- Actions à planifier : Utiliser systématiquement les journaux lors de futures modifications de code applicatif.  
- TODO / suivis : Ajouter des ADR spécifiques lors des futures décisions majeures.
