#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull udayagonuguntla/ci-cd-demo

# Run the Docker image as a container
docker run -d -p 3000:3000 udayagonuguntla/ci-cd-demo
