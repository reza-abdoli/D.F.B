FROM nginx:1.18

COPY ./default.conf /etc/nginx/conf.d/default.conf

#WORKDIR ../nginx/frontend/dist 
#COPY . /usr/share/nginx/frontend/

#WORKDIR ../nginx/frontend/dist 
COPY ./dist/. /usr/share/nginx/frontend/

