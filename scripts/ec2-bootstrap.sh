#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${1:-/var/www/easy-ops-testing}"
REPO_URL="${2:-https://github.com/Devgambo/Easyops-testing.git}"

sudo apt-get update
sudo apt-get install -y curl git

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

sudo mkdir -p "$APP_DIR"
sudo chown -R "$USER":"$USER" "$APP_DIR"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
npm ci
pm2 startOrRestart ecosystem.config.js --env production
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME"

echo "EC2 bootstrap complete. App directory: $APP_DIR"
