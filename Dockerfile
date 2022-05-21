FROM node:16 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm ci --only=production

COPY ./ /app/

RUN npm run build


FROM nginx:1.21

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf