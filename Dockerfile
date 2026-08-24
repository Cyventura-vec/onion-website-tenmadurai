FROM php:7.4-apache

RUN docker-php-ext-install mysqli

COPY ./html/ /var/www/html/
COPY ./classified/ /opt/kumari_classified/

RUN mkdir -p /var/www/html/tmp/error_logs
RUN chmod -R 755 /var/www/html
RUN chmod 644 /var/www/html/config.php
RUN chmod -R 750 /opt/kumari_classified

RUN useradd -m ctf_user
RUN chown -R www-data:www-data /var/www/html
RUN chown -R www-data:www-data /opt/kumari_classified

EXPOSE 80
