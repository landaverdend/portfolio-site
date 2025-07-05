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

docker build --platform linux/amd64 --no-cache -t $IMAGE_NAME:latest .

# Save and compress the docker image
echo "Saving and compressing docker image..."
docker save $IMAGE_NAME:latest | gzip > portfolio-site.tar.gz

# Transfer files to remote server using environment variables
echo "Transferring to remote server..."
scp -i "${SSH_KEY_PATH}" -o PreferredAuthentications=publickey -o StrictHostKeyChecking=no portfolio-site.tar.gz docker-compose.yml "${LINODE_USERNAME}@194.195.214.234:~/"

# Execute remote commands to reload the container
echo "Deploying on remote server..."
echo "SSH key path is: ${SSH_KEY_PATH}"
ssh -i "${SSH_KEY_PATH}" -o PreferredAuthentications=publickey -o StrictHostKeyChecking=no "${LINODE_USERNAME}@194.195.214.234" "
    sudo mkdir -p /root/portfolio && \
    sudo mv ~/portfolio-site.tar.gz /root/portfolio/ && \
    cd /root/portfolio && \
    sudo docker load < portfolio-site.tar.gz && \
    sudo docker-compose down && \
    sudo docker-compose up -d && \
    sudo rm portfolio-site.tar.gz
"

# Clean up local tar file
rm portfolio-site.tar.gz
