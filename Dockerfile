FROM node:8.9.4-alpine

LABEL maintainer="Flatland Church"

WORKDIR /usr/src/site
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
EXPOSE 3000

CMD ["npm", "run-script", "start"]
