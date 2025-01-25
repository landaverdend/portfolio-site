#!/bin/bash

# Get the current directory (where the script and Dockerfile should be)
SCRIPT_DIR=$(pwd)

# Set the image name (you can change this if you prefer)
IMAGE_NAME="portfolio-site"

# Remote server details
REMOTE_USER="root"
REMOTE_HOST="194.195.214.234"
REMOTE_PATH="/root/docker"

# Build the Docker image
echo "Building Docker image..."
docker build --platform linux/amd64 -t $IMAGE_NAME $SCRIPT_DIR


# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Docker image built successfully."

    # Save the Docker image to a tar file (without compression)
    echo "Saving Docker image to a tar file..."
    docker save $IMAGE_NAME -o $IMAGE_NAME.tar

    # Check if saving was successful
    if [ $? -eq 0 ]; then
        echo "Docker image saved successfully to $IMAGE_NAME.tar"

        # Transfer the tar file to the remote server using SCP
        echo "Transferring Docker image to remote server..."
        scp $IMAGE_NAME.tar $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

        # Check if SCP transfer was successful
        if [ $? -eq 0 ]; then
            echo "Docker image transferred successfully to $REMOTE_HOST:$REMOTE_PATH"
        else
            echo "Failed to transfer the Docker image."
        fi

        rm $IMAGE_NAME.tar
    else
        echo "Failed to save the Docker image."
    fi
else
    echo "Docker image build failed."
fi
