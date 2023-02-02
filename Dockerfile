##  typescript files
FROM node:16.3.0-alpine as build

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY . ./
RUN npm install && npm run build
COPY . /app
RUN ls -a

## run project
FROM node:16.3.0-alpine as prod

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g

COPY --from=build /app/dist ./dist
EXPOSE 80

CMD ["node", "dist/bin/www.js"]