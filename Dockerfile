FROM nginx:1.21

COPY ./app/ /var/www/thinker/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
