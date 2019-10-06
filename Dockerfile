FROM node:10-alpine

COPY src/app.js .

ENTRYPOINT ["node", "app.js"]
