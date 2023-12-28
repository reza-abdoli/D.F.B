FROM node:20-alpine3.18

WORKDIR /app/bin

COPY package*.json .

RUN npm install

COPY . .


EXPOSE 3060

CMD [ "node","main.js" ]
# FROM node:20-alpine3.18
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# RUN npm install

# RUN node install -g less

# COPY --chown=node:node . .

# EXPOSE 3060

# CMD [ "node", "main.js" ]