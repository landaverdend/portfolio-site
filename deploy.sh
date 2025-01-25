#!/bin/bash

# build the frontend package first.
echo "Building frontend.."
cd ./frontend/
npm run build

cd ..
cp -r ./frontend/dist/* ./backend/src/main/resources/static/
