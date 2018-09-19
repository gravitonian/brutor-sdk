#!/bin/bash

# Stop the whole DBP component (i.e. ACS and APS) solution with Docker Compose, this stops and removes the containers
cd runner/docker-compose
docker-compose down
