#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull udayagonuguntla/campus-management-node-apis

# Run the Docker image as a container
docker run -d -p 3000:3000 udayagonuguntla/campus-management-node-apis