FROM node:20-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 4200
CMD ["npm", "start"]
