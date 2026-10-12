#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
URL='http://127.0.0.1:8765/'
if curl -fsS "$URL" >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi
python3 -m http.server 8765 --bind 127.0.0.1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT INT TERM
for attempt in {1..30}; do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    open "$URL"
    break
  fi
  sleep 0.2
done
printf '\nStore & Lumière est disponible sur %s\nGardez cette fenêtre ouverte. Ctrl+C arrête le serveur.\n' "$URL"
wait "$SERVER_PID"
