#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE webhooks_db;
    CREATE DATABASE endpoints_db;
    GRANT ALL PRIVILEGES ON DATABASE webhooks_db TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE endpoints_db TO $POSTGRES_USER;
EOSQL
