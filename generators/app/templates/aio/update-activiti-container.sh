#!/bin/bash

# Now build extension first and then build the Docker Image via Fabric 8 Maven plugin
./build-activiti-docker-image.sh

# Start the Activiti container (will use the new SNAPSHOT image)
cd runner/docker-compose
docker-compose up -d --no-deps process
cd ../..
