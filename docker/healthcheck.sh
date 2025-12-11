#!/bin/bash

# MySQL healthcheck: Verify database and schema are ready
# This ensures the initialization scripts have completed before dependent services start

MYSQL_HOST="${MYSQL_HOST:-localhost}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-}"
MYSQL_DATABASE="${MYSQL_DATABASE:-mysql}"

# Exit gracefully if credentials aren't set (shouldn't happen in docker-compose)
if [ -z "$MYSQL_PASSWORD" ] && [ "$MYSQL_USER" != "root" ]; then
  echo "Error: MYSQL_PASSWORD not set for user $MYSQL_USER"
  exit 1
fi

# Try to query the projects table (proves schema exists + is queryable)
mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" \
  -e "SELECT 1 FROM projects LIMIT 1;" > /dev/null 2>&1

exit $?
