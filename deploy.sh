#!/bin/bash

# Load environment variables at the start
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
else
    echo ".env file not found"
    exit 1
fi

# build the frontend package first.
echo "Shutting systems down"
docker-compose down
echo "Building frontend.."
cd ./frontend/
npm install
npm run clean
npm run build

cd ..
cp -r ./frontend/dist/* ./backend/src/main/resources/static/

cd ./backend/
echo "Building backend"
./gradlew clean build

IMAGE_NAME="portfolio-site"

echo "Building docker container"
docker build --no-cache -t $IMAGE_NAME:latest .
docker system prune -f
echo "spinning back up"
docker-compose up -d 