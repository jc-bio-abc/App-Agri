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
