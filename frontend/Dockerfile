FROM node AS build
COPY package*.json ./
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "build"]
FROM nginx as frontend
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
