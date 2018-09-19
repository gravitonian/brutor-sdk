#!/bin/bash

# Stop the share container
cd runner/docker-compose
docker-compose stop share
cd ../..

# Now build extension first and then build the Docker Image via Fabric 8 Maven plugin
./build-share-docker-image.sh

# Start the share container (will use the new SNAPSHOT image)
cd runner/docker-compose
docker-compose up -d --no-deps share
cd ../..
