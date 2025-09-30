#!/bin/bash
sudo docker run --name postgres-db \
  -e POSTGRES_PASSWORD=pwd4Stacquer! \
  -e POSTGRES_USER=stacquer \
  -e POSTGRES_DB=stacquerdb \
  -p 5432:5432 \
  -v pg_data:/var/lib/postgresql/data \
  -d \
  postgres:18.0-bookworm