FROM node:10-alpine

WORKDIR /app

COPY src/app/. .

ENTRYPOINT ["node", "index.js"]
