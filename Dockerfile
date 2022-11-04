FROM node:16.14-alpine3.14

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app