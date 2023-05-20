#!/bin/sh
# Created by Kanhu

git pull origin development

WORKING_DIR=$(pwd)
DUMP_PATH="${WORKING_DIR}/sql_dump"

# Restore the database
mysql -uroot -proot@123 dpc < "${DUMP_PATH}/dpc.sql"

echo "Thanks kanhu, pull completed successfully"