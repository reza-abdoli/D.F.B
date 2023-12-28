FROM nginx:1.18

RUN rm -frv /usr/share/nginx/frontend/*

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./dist/. /usr/share/nginx/frontend/

EXPOSE 80

#WORKDIR ../nginx/frontend/dist 
#COPY . /usr/share/nginx/frontend/

#WORKDIR ../nginx/frontend/dist 


