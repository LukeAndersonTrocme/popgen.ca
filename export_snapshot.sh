#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# 1) Prepare output directory + unique, date-based filename
DATE=$(date '+%Y-%m-%d')
OUTPUT_DIR="misc"
mkdir -p "$OUTPUT_DIR"

BASE_PATH="$OUTPUT_DIR/popgen_snapshot_$DATE"
OUTPUT_FILE="$BASE_PATH.txt"
COUNT=1
while [[ -e "$OUTPUT_FILE" ]]; do
  OUTPUT_FILE="${BASE_PATH}_$COUNT.txt"
  ((COUNT++))
done

printf 'Exporting popgen.ca repo snapshot to %s\n' "$OUTPUT_FILE"
printf '==== popgen.ca snapshot: %s ====\n\n' "$(date)" > "$OUTPUT_FILE"

# 2) Statically include these top-level files (text-based configs & scripts)
declare -a FILES=(
  "CNAME"
  "astro.config.mjs"
  "postcss.config.cjs"
  "setup.sh"
  "tailwind.config.cjs"
)

# 3) Dynamically find all text files under src/, excluding binaries & misc output
while IFS= read -r f; do
  FILES+=("$f")
done < <(
  find src \
    -type f \
    \( \
      -iname '*.md' -o \
      -iname '*.astro' -o \
      -iname '*.jsx' -o \
      -iname '*.js' -o \
      -iname '*.cjs' -o \
      -iname '*.mjs' -o \
      -iname '*.json' -o \
      -iname '*.yaml' -o \
      -iname '*.yml' \
    \) \
    -not -path '*/node_modules/*' \
    -not -path '*/misc/*' \
    -not -path '*/dist/*' \
    | sort
)

# 4) Loop through each file and append its contents
for file in "${FILES[@]}"; do
  printf '\n\n===== %s =====\n' "$file" >> "$OUTPUT_FILE"
  if [[ -f "$file" ]]; then
    cat "$file" >> "$OUTPUT_FILE"
  else
    printf '*** File not found: %s\n' "$file" >> "$OUTPUT_FILE"
  fi
done

printf '\nDone! Snapshot saved to %s\n' "$OUTPUT_FILE"
