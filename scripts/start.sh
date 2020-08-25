#!/bin/sh

echo Stopping running containers...
docker-compose down
echo Done.

echo Removing existing image...
docker image rm resume-generator_server
echo Done.

echo Starting containers again...
docker-compose up -d
echo Done.

echo Showing container logs:
docker-compose logs -f