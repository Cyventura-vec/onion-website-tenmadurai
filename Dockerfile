FROM php:7.4-apache

RUN apt-get update && \
    apt-get install -y unzip libzip-dev && \
    docker-php-ext-install mysqli zip && \
    rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install sendmail
RUN apt-get update && \
    apt-get install -y sendmail sendmail-bin sendmail-base && \
    rm -rf /var/lib/apt/lists/*

# PHP mail() configuration
COPY ./php.ini /usr/local/etc/php/conf.d/ctf.ini

# Copy website
COPY ./html/ /var/www/html/

# Install PHPMailer 5.2.16
WORKDIR /var/www/html
RUN composer install --no-dev --no-interaction --prefer-dist

# Existing classified files
COPY ./classified/ /opt/kumari_classified/

# Required directories
RUN mkdir -p /var/www/html/tmp/error_logs

# Webroot writable by Apache/PHP
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html

# Classified data permissions
RUN chmod -R 750 /opt/kumari_classified && \
    chown -R www-data:www-data /opt/kumari_classified

# CTF flag outside webroot
RUN mkdir -p /opt/ctf && \
    echo 'CYV{TENMADURAI_ARCHIVE_2026}' > /opt/ctf/flag.txt && \
    chmod 640 /opt/ctf/flag.txt && \
    chown root:www-data /opt/ctf/flag.txt

COPY ./start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]

EXPOSE 80