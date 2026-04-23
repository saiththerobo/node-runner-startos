#!/bin/sh
set -e
cd /app/work

if [ -n "$START_COMMAND" ]; then
  exec sh -c "$START_COMMAND"
fi

if [ -f package.json ]; then
  if node -e "const p=require('./package.json');process.exit(p.scripts&&p.scripts.start?0:1)" 2>/dev/null; then
    exec npm start
  fi
fi

for f in index.js server.js app.js; do
  if [ -f "$f" ]; then
    exec node "$f"
  fi
done

echo "ERROR: No entry point found. Make sure your app has a 'start' script in package.json, or a top-level index.js / server.js / app.js file."
exit 1
