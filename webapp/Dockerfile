FROM node:18

ENV NODE_ENV=production

COPY . /usr/local/app
WORKDIR /usr/local/app

RUN npm i -g npm@9.8.1 serve
RUN npm i --frozen-lockfile
RUN npm run build

EXPOSE 8080

CMD ["serve", "-p", "8080", "-L", "-u", "-s", "build/"]
