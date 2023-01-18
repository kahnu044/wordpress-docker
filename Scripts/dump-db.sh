#!/bin/bash
CWD=`CPWD=$(pwd);cd $(dirname \$0);pwd;cd \$CPWD`
REPO_DIR=`dirname $CWD`
source $REPO_DIR/.env
docker exec -i ${COMPOSE_PROJECT_NAME}_db_1 mysqldump -uroot -proot $MYSQL_DATABASE > $REPO_DIR/dump/${COMPOSE_PROJECT_NAME}.sql
