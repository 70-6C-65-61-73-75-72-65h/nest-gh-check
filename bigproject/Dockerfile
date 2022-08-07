FROM node:16.16.0-alpine3.16
RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci

COPY . /app
#dev
# ENTRYPOINT  ["/bin/sh"]
EXPOSE 3000

CMD [ "npm", "run","start:dev"]
# CMD ["node", "server.js"]