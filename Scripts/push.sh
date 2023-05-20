#!/bin/sh
# Created by Kanhu

CWD=`CPWD=$(pwd);cd $(dirname \$0);pwd;cd \$CPWD`
REPO_DIR=`dirname $CWD`
source $REPO_DIR/.env
docker exec -i ${COMPOSE_PROJECT_NAME}_db_1 mysqldump -uroot -proot $MYSQL_DATABASE > $REPO_DIR/dump/${COMPOSE_PROJECT_NAME}.sql

git add .

# Ask the user for the branch name
read -p "Enter the commit message : " commit_msg

# Commit the changes
git commit -m $commit_msg


# Ask the user for the branch name
read -p "Enter the branch name: " branch_name

# Push the code to the branch
git push origin $branch_name

echo "Thanks kanhu, push completed successfully"