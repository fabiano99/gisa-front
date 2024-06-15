FROM node:20-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 80
CMD ["npm", "start"]
