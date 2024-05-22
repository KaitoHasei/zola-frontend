FROM node:18-alpine as builder

WORKDIR /reactjs-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /reactjs-app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]