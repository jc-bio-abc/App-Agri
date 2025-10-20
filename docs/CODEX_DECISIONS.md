[2025-10-20] Résolution finale conflits PR #4

Contexte
Conflits sur angular.json, app shell, modules features, pages fields et warehouses.

Décision
Uniformisation PageComponent, correction Material bindings, imports Angular/Material/Translate, lazy route vérifiée.

Détails d’implémentation
Fichiers modifiés : angular.json, src/app/app.component.ts, src/app/app.module.ts, modules de fonctionnalités (activities, dashboard, planning, products, seeds, warehouses), refonte du module parcelles (routing, composants, pages), correction du template entrepôts. Commandes exécutées : npm install, CI=1 NG_CLI_ANALYTICS=false npx ng build --verbose. Résultat : build OK.

Étapes suivantes
Vérifier la CI “Codex Decision Guard” à la prochaine PR/merge.
