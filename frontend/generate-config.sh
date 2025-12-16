#!/bin/sh
# Generates config.js with runtime environment variables

set -e

CONFIG_FILE="/usr/share/nginx/html/config.js"

cat <<EOF > "$CONFIG_FILE"
(function(window) {
  window.APP_CONFIG = {
    apiUrl: "${API_URL:-http://localhost:3000}",
    environment: "${ENVIRONMENT:-development}"
  };
})(window);
EOF

# Verify file was created
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ ERROR: Failed to generate config.js" >&2
  exit 1
fi

echo "✅ Generated config.js with API_URL=${API_URL:-http://localhost:3000}"
