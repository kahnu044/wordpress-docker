FROM debian:buster-slim
ARG APP_UID
ENV APP_UID=${APP_UID:-1000}
EXPOSE $APP_UID
ARG APP_GID
ENV APP_GID=${APP_GID:-1000}
EXPOSE $APP_GID
ARG APP_USRNAME
ENV APP_USRNAME=${APP_USRNAME:-nt}
RUN apt update -y
RUN apt dist-upgrade -y
RUN apt install -y gnupg2 ca-certificates apt-transport-https wget curl git default-mysql-client p7zip-full screen zip unzip sudo
RUN wget -q https://packages.sury.org/php/apt.gpg -O- | apt-key add -
RUN echo "deb https://packages.sury.org/php/ buster main" | tee /etc/apt/sources.list.d/php.list && apt update -y && apt dist-upgrade -y
RUN apt update -y
RUN apt install -y php7.4-cli php7.4-bz2 php-common php7.4-curl php7.4-gd php7.4-json php7.4-mbstring php7.4-mysql php7.4-xml php7.4-curl php7.4-soap php7.4-bcmath php7.4-zip php7.4-gd php7.4-imagick php7.4-intl
RUN php7.4 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php7.4 -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php7.4 composer-setup.php --install-dir=/usr/bin --filename=composer && \
    php7.4 -r "unlink('composer-setup.php');" && \
    chmod +x /usr/bin/composer
RUN curl https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar > /usr/bin/wp && \
    chmod +x /usr/bin/wp
RUN whoami
RUN groupadd -g ${APP_GID} _dev
RUN useradd -u ${APP_UID} -g ${APP_GID} -m "${APP_USRNAME}_dev"
RUN usermod -aG sudo "${APP_USRNAME}_dev"
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER  "${APP_USRNAME}_dev"
RUN whoami
RUN cd $HOME && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN /bin/bash -c "source $HOME/.nvm/nvm.sh && nvm install --lts"
