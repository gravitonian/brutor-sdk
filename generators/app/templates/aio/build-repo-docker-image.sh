#!/bin/bash

# Always build extension first so we get the latest customization in Docker Image
./build-repo-extension.sh

# Now build the Docker Image via Fabric 8 Maven plugin
cd repo-docker
mvn clean install
