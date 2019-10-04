FROM node:10-alpine

COPY app.js .

ENTRYPOINT ["node", "app.js"]
