# LocalGoogle

LocalGoogle WordPress WebSite.

## Setup Steps (Using Docker) - _the correct way_

0. Install `Docker`, `git` and `Visual Studio Code` on your OS (`macOS`, `Windows` or `Linux`)
1. Go to Repository directory
    ```bash
    cd wordpress-docker
    ```
2. Copy `wordpress-docker/.env.example` to `wordpress-docker/.env` and update as required
    ```bash
    cp .env.example .env
    ```
    #### ONLY FOR Linux Systems, follow these steps:
    - If you are running on Linux hosts, first get your current users `UID`, `GID` and `USRNAME` by running the following commands:
        ```bash
        id -u # APP_UID
        id -g # APP_GID
        whoami # USRNAME
        ```
    - Update the `.env` file with the above obtained `UID`, `GID` and `USRNAME` or run the following command:
        ```bash
        perl -pi -e 's/APP_UID=.*/APP_UID='`id -u`'/g' .env # Updates APP_UID
        perl -pi -e 's/APP_GID=.*/APP_GID='`id -g`'/g' .env # Updates APP_GID
        ```
    #### For macOS and Windows:
    - Change the `APP_UID` and `APP_GID` in `.env` file to `1000` each
4. Build Docker Images
    ```bash
    docker-compose build
    ```
5. Start Docker Containers
    ```bash
    docker-compose up -d
    ```
    - First run will take time as it performs `npm install` and sets up phpMyAdmin
    - You can check status by running `docker-compose logs --f app`
7. Activate Local Docker Compose Environment Inside Repository Directory:
   ```bash
   source activate
   ```
    - This will expose the `apprun` and `dbrun` unix commands
    - To deactivate run
      ```bash
      deactivate
      ```
8. Update local hostfile to serve `wp.localgoogle.com`:
    ```bash
    echo "0.0.0.0   wp.localgoogle.com"  | sudo tee -a /etc/hosts
    ```
9. Open http://wp.localgoogle.com:8012 and complete setup using information as per `.env` file
10. Once setup is complete run the following to restore database:
    ```bash
    cp dump/localgoogle.sql WebSite
    apprun 'wp db import localgoogle.sql'
    rm localgoogle.sql'
    ```
    Export DB:
    ```bash
    apprun 'wp db export localgoogle.sql; mv WebSite/localgoogle.sql dump/localgoogle.sql'
    ```
11. All `docker-compose` commands must be run from within `wordpress-docker` directory.
12. SMTP Settings at `/wp-admin/options-general.php?page=swpsmtp_settings#smtp`:
    1.  SMTP Host: `mailhog`
    2.  Type of Encryption: `None`
    3.  SMTP Port: `1025`
    4.  No Username/Password Auth required

### Using Docker Compose Environment
1. Run `source activate` in the repository directory
2. To run any command inside `app` container run `apprun "your command"`
3. To run any command inside `db` container run `dbrun "your command"`
3. To exit docker compose environment run `deactivate`

### Notes
1. Default MySQL root Username and Password is `root`.
2. Single quotes `'` don't work in docker-compose commands in Windows.
3. If you are upgrading from `MySQL 5.7` to `MariaDB 10.5` on your container please run the following command:
    ```bash
    docker-compose exec db /bin/bash -c "mariadb-upgrade -uroot -proot"
    ```
