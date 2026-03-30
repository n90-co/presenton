#!/bin/bash
# NEXT90 Presenton Bootstrap Script
# Copies custom templates, assets, and config into the Presenton container
# at startup. Runs as an init container or entrypoint wrapper.
#
# Mount the n90-co/presenton repo (or just the customization dirs) at /n90-custom/
# This script copies everything into the right paths.

set -e

CUSTOM_DIR="${N90_CUSTOM_DIR:-/n90-custom}"
APP_DIR="/app/servers/nextjs"
TEMPLATES_DIR="$APP_DIR/app/presentation-templates"

echo "[n90-bootstrap] Starting NEXT90 customization bootstrap..."

# 1. Copy n90-brand templates
if [ -d "$CUSTOM_DIR/servers/nextjs/app/presentation-templates/n90-brand" ]; then
  echo "[n90-bootstrap] Copying n90-brand templates..."
  cp -r "$CUSTOM_DIR/servers/nextjs/app/presentation-templates/n90-brand" "$TEMPLATES_DIR/"
  echo "[n90-bootstrap]   → $(ls $TEMPLATES_DIR/n90-brand/*.tsx 2>/dev/null | wc -l) TSX templates"
fi

# 2. Copy patched index.tsx (with n90-brand registrations)
if [ -f "$CUSTOM_DIR/servers/nextjs/app/presentation-templates/index.tsx" ]; then
  echo "[n90-bootstrap] Patching index.tsx with n90-brand registrations..."
  cp "$CUSTOM_DIR/servers/nextjs/app/presentation-templates/index.tsx" "$TEMPLATES_DIR/index.tsx"
fi

# 3. Copy n90-assets (images, pictograms, logos)
if [ -d "$CUSTOM_DIR/servers/nextjs/public/n90-assets" ]; then
  echo "[n90-bootstrap] Copying n90-assets..."
  cp -r "$CUSTOM_DIR/servers/nextjs/public/n90-assets" "$APP_DIR/public/"
  echo "[n90-bootstrap]   → $(ls $APP_DIR/public/n90-assets/images/ 2>/dev/null | wc -l) images"
  echo "[n90-bootstrap]   → $(ls $APP_DIR/public/n90-assets/pictograms/ 2>/dev/null | wc -l) pictograms"
  echo "[n90-bootstrap]   → $(ls $APP_DIR/public/n90-assets/logos/ 2>/dev/null | wc -l) logos"
fi

echo "[n90-bootstrap] Bootstrap complete."

# 4. Check if Next.js needs rebuilding (templates changed)
if [ -f "$TEMPLATES_DIR/n90-brand/.needs-rebuild" ] || [ "$N90_FORCE_REBUILD" = "true" ]; then
  echo "[n90-bootstrap] Templates changed — rebuilding Next.js..."
  cd "$APP_DIR"
  npm run build 2>&1 | tail -5
  rm -f "$TEMPLATES_DIR/n90-brand/.needs-rebuild"
  echo "[n90-bootstrap] Next.js rebuild complete."
else
  echo "[n90-bootstrap] No rebuild needed — using cached build."
fi

echo "[n90-bootstrap] Starting Presenton..."

# 5. Execute the original entrypoint
exec node /app/start.js "$@"
