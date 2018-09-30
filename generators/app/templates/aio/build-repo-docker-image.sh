#!/bin/bash

# Always build extension first so we get the latest customization in Docker Image
./build-repo-extension.sh

# Make sure there are no existing Docker containers, that would prohibit the associated Docker images from being
# removed and updated.
docker container stop docker-compose_content_1
docker container rm docker-compose_content_1

# Now build the Docker Image via Fabric 8 Maven plugin
cd repo-aggregator-docker
mvn clean install
