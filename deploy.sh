#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
elif [ -f ./frontend/.env ]; then
    export $(cat ./frontend/.env | grep -v '^#' | xargs)
elif [ -f ./backend/.env ]; then
    export $(cat ./backend/.env | grep -v '^#' | xargs)
fi

# build the frontend package first.
echo "Shutting systems down"
docker-compose down
echo "Building frontend.."
cd ./frontend/
npm install
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