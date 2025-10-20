#!/usr/bin/env bash
set -euo pipefail
TITLE="${1:?title}"; RESULT="${2:?result}"
SCOPE="${3:-}"; CHANGES="${4:-}"; REASON="${5:-}"; ALTS="${6:-}"; CMDS="${7:-}"
TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
ENTRY=$(jq -cn \
  --arg ts "$TS" \
  --arg title "$TITLE" \
  --arg result "$RESULT" \
  --arg reason "$REASON" \
  --arg scope "$SCOPE" \
  --arg changes "$CHANGES" \
  --arg alts "$ALTS" \
  --arg cmds "$CMDS" \
  '{ts:$ts,title:$title,result:$result,reason:$reason,scope:($scope|split(",")//[]),changes:($changes|split(",")//[]),alternatives:($alts|split(",")//[]),commands:($cmds|split(",")//[])}')
mkdir -p docs
echo "$ENTRY" >> docs/codex-log.jsonl
echo "Appended to docs/codex-log.jsonl"
