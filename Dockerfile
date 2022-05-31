FROM nginx:1.21

COPY /app/ /var/www/thinker/html

COPY /app/nginx.conf /etc/nginx/conf.d/default.conf
