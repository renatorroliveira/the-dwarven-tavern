FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./tdt-webapp.conf /etc/nginx/conf.d/tdt-webapp.conf

RUN mkdir -p /etc/nginx/ssl
RUN mkdir -p /var/logs/nginx/api
RUN mkdir -p /var/logs/nginx/webapp

EXPOSE 80
EXPOSE 443
