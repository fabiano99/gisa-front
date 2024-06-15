FROM node:20-alpine
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 80
CMD ng serve --port 80
