#!/bin/bash


IMAGE_NAME="portfolio-site-backend"

# Remote server details
REMOTE_USER="root"
REMOTE_HOST="194.195.214.234"
REMOTE_PATH="/var/www/landaverde.in"

ZIP_FILE="build.zip"

npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

zip -r $ZIP_FILE dist
scp $ZIP_FILE $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
rm $ZIP_FILE
