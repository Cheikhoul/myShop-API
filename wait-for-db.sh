#!/bin/sh

host="$1"
shift
cmd="$@"

echo "waiting for mysql..."
until mysqladmin ping -h"$host" --silent; do
  echo "Error: $? - Retrying..."
  sleep 1
done

echo "mysql is ready - executing command"
exec $cmd
