FROM node:18

ENV NODE_ENV=production

COPY . /usr/local/app
WORKDIR /usr/local/app

RUN npm i -g npm@9.8.1 @nestjs/cli@10.1.0
RUN npm i --frozen-lockfile
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
