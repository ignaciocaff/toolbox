FROM node:14-alpine

ARG environment=prod
WORKDIR /api
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . ./
COPY .env.$environment .env
EXPOSE 8080
CMD [ "npm", "start" ]
