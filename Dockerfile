FROM node:16-alpine

WORKDIR /usr/app

COPY . . 

COPY package.json ./

RUN rm -rf node_modules

RUN yarn

CMD ["yarn","start:server"]

EXPOSE 3333