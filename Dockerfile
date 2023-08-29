FROM nginx:1.25.0

WORKDIR /usr/share/nginx/html/
USER root

COPY build/default.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80
