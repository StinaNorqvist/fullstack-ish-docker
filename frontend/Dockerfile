FROM node
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]