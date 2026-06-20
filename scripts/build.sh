#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

echo "→ Build produção para Cloudflare Pages"

rm -rf "$DIST"
mkdir -p "$DIST/assets"

cp "$ROOT/index.html" "$ROOT/main.js" "$ROOT/style.css" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$DIST/"
cp "$ROOT/assets/"*.webp "$ROOT/assets/"*.css "$ROOT/assets/"*.js "$DIST/assets/"
cp "$ROOT/_headers" "$DIST/_headers"

cat > "$DIST/404.html" << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página não encontrada</title>
  <meta http-equiv="refresh" content="3;url=/">
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
      background: #111; color: #F0EDE8; font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
    a { color: #FFA501; }
  </style>
</head>
<body>
  <div>
    <h1>Página não encontrada</h1>
    <p>Redirecionando para a página inicial…</p>
    <p><a href="/">Voltar agora</a></p>
  </div>
</body>
</html>
EOF

BYTES=$(du -sh "$DIST" | cut -f1)
FILES=$(find "$DIST" -type f | wc -l)
echo "✓ Build concluído: $DIST ($BYTES, $FILES arquivos)"
