#!/bin/bash
CWD=`CPWD=$(pwd);cd $(dirname \$0);pwd;cd \$CPWD`
REPO_DIR=`dirname $CWD`
source $REPO_DIR/.env
echo "DROP DATABASE ${MYSQL_DATABASE}; CREATE DATABASE ${MYSQL_DATABASE};" | docker exec -i "${COMPOSE_PROJECT_NAME}_db_1" mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}"
pv $REPO_DIR/dump/${COMPOSE_PROJECT_NAME}.sql | docker exec -i "${COMPOSE_PROJECT_NAME}_db_1" mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}"
