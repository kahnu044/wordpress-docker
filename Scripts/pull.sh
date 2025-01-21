#!/bin/sh
# Created by Kanhu

WORKING_DIR=$(pwd)
DUMP_PATH="${WORKING_DIR}/sql_dump"
source $REPO_DIR/.env

# Restore the database
docker exec -i ${COMPOSE_PROJECT_NAME}_db_1 mysql -uroot -proot $MYSQL_DATABASE < $REPO_DIR/dump/${COMPOSE_PROJECT_NAME}.sql

echo "Thanks, pull completed successfully"