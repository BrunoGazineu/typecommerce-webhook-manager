FROM node:20-slim

WORKDIR /app

COPY ./endpoints-service/package*.json .

RUN npm install

COPY ./endpoints-service/ .

RUN npm run build

ENV NODE_ENV=docker

CMD [ "npm", "run", "start:dev" ]