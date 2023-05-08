FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
