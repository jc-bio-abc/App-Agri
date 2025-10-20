const { execSync } = require('node:child_process');

function sh(cmd) {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
}

const isPR = !!process.env.GITHUB_BASE_REF;
let baseRef, headRef;

if (isPR) {
  baseRef = 'origin/' + process.env.GITHUB_BASE_REF;
  headRef = 'HEAD';
} else {
  // push direct: compare to previous commit
  baseRef = 'HEAD~1';
  headRef = 'HEAD';
}

// files considered as "code" (require journals update)
const CODE_PATTERNS = [
  'src/',
  'projects/',
  'package.json',
  'angular.json',
  'tsconfig.json',
  'tsconfig.*.json'
];

// paths that do NOT require journals (docs-only, CI-only, images, etc.)
const ALLOW_ONLY_PATHS = [
  'docs/',
  '.github/',
  'scripts/',
  'README',
  'LICENSE',
  '.gitignore',
];

function getChangedFiles(base, head) {
  const out = sh(`git diff --name-only ${base} ${head}`);
  return out ? out.split('\n').filter(Boolean) : [];
}

function isOnlyAllowed(files) {
  return files.every(f =>
    ALLOW_ONLY_PATHS.some(p => f.startsWith(p)) ||
    f.endsWith('.md') ||
    f.endsWith('.txt') ||
    f.startsWith('.husky/')
  );
}

function anyMatches(files, patterns) {
  return files.some(f => patterns.some(p => f === p || f.startsWith(p)));
}

const changed = getChangedFiles(baseRef, headRef);

// If nothing changed (unlikely) or only docs/ci/etc., allow
if (changed.length === 0 || isOnlyAllowed(changed)) {
  console.log('No code changes requiring journals.');
  process.exit(0);
}

// If code changed, ensure journals updated
const requireJournals = anyMatches(changed, CODE_PATTERNS);

if (requireJournals) {
  const journalsChanged =
    changed.includes('docs/CODEX_DECISIONS.md') ||
    changed.includes('docs/codex-log.jsonl') ||
    changed.some((f) => f.startsWith('docs/adr/'));

  if (!journalsChanged) {
    console.error('❌ Code changes detected but journals were not updated.');
    console.error('   Please update docs/CODEX_DECISIONS.md and append to docs/codex-log.jsonl (or add an ADR).');
    console.error('   Changed files:\n' + changed.join('\n'));
    process.exit(1);
  }
}

console.log('✅ Journals present alongside code changes.');
process.exit(0);
