param(
  [Parameter(Mandatory=$true)][string]$Title,
  [Parameter(Mandatory=$true)][string]$Result,
  [string[]]$Scope=@(),
  [string[]]$Changes=@(),
  [string]$Reason="",
  [string[]]$Alternatives=@(),
  [string[]]$Commands=@()
)
$ts = (Get-Date).ToUniversalTime().ToString("o")
$entry = [ordered]@{
  ts = $ts; title = $Title; scope = $Scope; changes = $Changes;
  reason = $Reason; alternatives = $Alternatives; commands = $Commands;
  result = $Result
}
$json = ($entry | ConvertTo-Json -Compress)
New-Item -ItemType Directory -Force -Path "docs" | Out-Null
Add-Content -Path "docs/codex-log.jsonl" -Value ($json + "`n") -Encoding UTF8
Write-Host "Appended to docs/codex-log.jsonl"
