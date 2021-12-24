FROM node:16.13.1-alpine

WORKDIR /home/application

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["yarn","start:prod"]