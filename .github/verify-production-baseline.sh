#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/.github/production-baseline.sha256"
RELEASE_MANIFEST="$ROOT/.github/production-release-308518e.sha256"
BASELINE_COMMIT="308518ecfe89418f09654f86521f2485a8c45970"
PRODUCTION_ORIGIN="https://radzhabov-dev.ru"
MODE="${1:---commit}"

hash_stream() {
  shasum -a 256 | awk '{print $1}'
}

verify_hash() {
  local expected="$1"
  local actual="$2"
  local file="$3"

  if [[ "$actual" != "$expected" ]]; then
    printf 'FAIL  %s\n      expected %s\n      actual   %s\n' "$file" "$expected" "$actual" >&2
    return 1
  fi

  printf 'OK    %s\n' "$file"
}

verify_manifest() {
  local source="$1"
  local failures=0

  while read -r expected file; do
    [[ -z "${expected:-}" || "$expected" == \#* ]] && continue

    case "$source" in
      commit)
        actual="$(git -C "$ROOT" show "$BASELINE_COMMIT:$file" | hash_stream)"
        ;;
      tree)
        actual="$(hash_stream < "$ROOT/$file")"
        ;;
      production)
        actual="$(curl --fail --silent --show-error "$PRODUCTION_ORIGIN/$file" | hash_stream)"
        ;;
      *)
        printf 'Unknown source: %s\n' "$source" >&2
        exit 2
        ;;
    esac

    verify_hash "$expected" "$actual" "$file" || failures=$((failures + 1))
  done < "$MANIFEST"

  if (( failures > 0 )); then
    printf '\nProduction baseline mismatch: %d protected file(s).\n' "$failures" >&2
    return 1
  fi
}

verify_release_commit() {
  local failures=0

  while read -r expected file; do
    [[ -z "${expected:-}" || "$expected" == \#* ]] && continue
    file="${file#./}"
    actual="$(git -C "$ROOT" show "$BASELINE_COMMIT:$file" | hash_stream)"
    verify_hash "$expected" "$actual" "$file" || failures=$((failures + 1))
  done < "$RELEASE_MANIFEST"

  if (( failures > 0 )); then
    printf '\nFull release manifest mismatch: %d file(s).\n' "$failures" >&2
    return 1
  fi
}

case "$MODE" in
  --commit)
    verify_manifest commit
    ;;
  --tree)
    verify_manifest tree
    ;;
  --production)
    verify_manifest production
    ;;
  --release-commit)
    verify_release_commit
    ;;
  *)
    printf 'Usage: %s [--commit|--tree|--production|--release-commit]\n' "$0" >&2
    exit 2
    ;;
esac

printf '\nGolden production baseline verified (%s).\n' "${MODE#--}"
