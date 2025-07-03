FROM debian:bullseye-slim

ARG APP_UID
ENV APP_UID=${APP_UID:-1000}
ARG APP_GID
ENV APP_GID=${APP_GID:-1000}
ARG APP_USRNAME
ENV APP_USRNAME=${APP_USRNAME:-nt}

# Update package lists and install required tools
RUN apt-get update -y && apt-get install -y \
    gnupg2 ca-certificates apt-transport-https wget curl git default-mysql-client p7zip-full screen zip unzip sudo

# Add PHP repository
RUN wget -qO - https://packages.sury.org/php/apt.gpg | apt-key add - && \
    echo "deb https://packages.sury.org/php/ bullseye main" | tee /etc/apt/sources.list.d/php.list

# Update package lists and upgrade system
RUN apt-get update -y && apt-get dist-upgrade -y

# Install PHP 8.4 and necessary extensions
RUN apt-get install -y \
    php8.4 php8.4-cli php8.4-bz2 php8.4-common php8.4-curl php8.4-gd \
    php8.4-mbstring php8.4-mysql php8.4-xml php8.4-soap php8.4-bcmath \
    php8.4-zip php8.4-imagick php8.4-intl php8.4-readline

# Install Composer using the official installer script
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Create a non-root user
RUN groupadd -g ${APP_GID} _dev && \
    useradd -u ${APP_UID} -g ${APP_GID} -m "${APP_USRNAME}_dev" && \
    usermod -aG sudo "${APP_USRNAME}_dev" && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER "${APP_USRNAME}_dev"
