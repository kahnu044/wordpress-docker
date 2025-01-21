#!/bin/bash
CWD=`CPWD=$(pwd);cd $(dirname \$0);pwd;cd \$CPWD`
REPO_DIR=`dirname $CWD`
source $REPO_DIR/.env

echo "DROP DATABASE ${MYSQL_DATABASE}; CREATE DATABASE ${MYSQL_DATABASE};" | docker exec -i "${COMPOSE_PROJECT_NAME}-db-1" mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}"

docker exec -i "${COMPOSE_PROJECT_NAME}-db-1" mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" < $REPO_DIR/dump/${COMPOSE_PROJECT_NAME}.sql

echo "Thanks, Database restored successfully"