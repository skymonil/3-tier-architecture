#!/bin/sh

# Create env.js dynamically using environment variable
cat <<EOF > /usr/share/nginx/html/env.js
window._env_ = {
  BACKEND_URL: "${BACKEND_URL}"
};
EOF

# Start NGINX
exec "$@"
