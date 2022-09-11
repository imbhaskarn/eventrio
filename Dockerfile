FROM node:16.16-alpine AS base_image

WORKDIR /app

RUN npm i -g nodemon
