#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-8080}"
echo "Seen uygulaması başlatılıyor: http://localhost:${PORT}"
python3 -m http.server "$PORT"
