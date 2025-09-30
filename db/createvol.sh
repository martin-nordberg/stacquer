#!/bin/bash
sudo docker volume create --opt type=none --opt o=bind --opt device=/data/pg_data pg_data