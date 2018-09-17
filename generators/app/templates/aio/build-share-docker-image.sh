#!/bin/bash

# Always build extension first so we get the latest customization in Docker Image
./build-share-extension.sh

# Now build the Docker Image via Fabric 8 Maven plugin
cd share-docker
mvn clean install
