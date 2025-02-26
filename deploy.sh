#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
elif [ -f ./frontend/.env ]; then
    export $(cat ./frontend/.env | grep -v '^#' | xargs)
elif [ -f ./backend/.env ]; then
    export $(cat ./backend/.env | grep -v '^#' | xargs)
fi

IMAGE_NAME="portfolio-site"
CONTAINER_NAME="portfolio-site"
TEMP_CONTAINER_NAME="${CONTAINER_NAME}-temp"

echo "Building frontend.."
cd ./frontend/
npm install
npm run build

cd ..
cp -r ./frontend/dist/* ./backend/src/main/resources/static/

cd ./backend/
echo "Building backend"
./gradlew clean build

echo "Building new docker container"
docker build --no-cache -t $IMAGE_NAME:new .

echo "Starting new container..."
# Start the new container with a temporary name
docker-compose -f docker-compose.yml -p ${TEMP_CONTAINER_NAME} up -d

# Wait for the new container to be healthy (adjust sleep time based on your app's startup time)
echo "Waiting for new container to be ready..."
sleep 10

# Check if the new container is running
if [ "$(docker ps -q -f name=${TEMP_CONTAINER_NAME})" ]; then
    echo "New container is running, switching traffic..."
    
    # Stop and remove the old container if it exists
    if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
        docker-compose down
    fi
    
    # Rename the temporary container to the main container name
    docker rename ${TEMP_CONTAINER_NAME} ${CONTAINER_NAME}
    
    echo "Deployment successful!"
    
    # Clean up old images
    docker system prune -f
else
    echo "New container failed to start. Rolling back..."
    docker-compose -f docker-compose.yml -p ${TEMP_CONTAINER_NAME} down
    exit 1
fi 