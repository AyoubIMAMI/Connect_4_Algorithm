# Using a Node.js base image
FROM node:alpine

LABEL description="This is a Docker image for running a node application to play Connect 4 against a bot through an API."
WORKDIR /app

COPY game ./game
COPY input ./input
COPY package*.json ./
COPY index.js ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
