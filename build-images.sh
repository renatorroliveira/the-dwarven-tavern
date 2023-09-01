#!/bin/bash

docker build -t tdt-api:latest api
docker build -t tdt-database:latest mongodb
docker build -t tdt-webapp:latest webapp
docker build -t tdt-webserver:latest webserver
