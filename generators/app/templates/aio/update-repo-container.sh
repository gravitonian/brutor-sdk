#!/bin/bash

# Stop the repo container
cd runner/docker-compose
docker-compose stop content
cd ../..

# Now build extension first and then build the Docker Image via Fabric 8 Maven plugin
./build-repo-docker-image.sh

# Start the repo container (will use the new SNAPSHOT image)
cd runner/docker-compose
docker-compose up -d --no-deps content
cd ../..
