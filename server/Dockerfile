FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV MONGO_SERVER "mongodb://mongo:27017/"
COPY . /usr/src/app
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "server"]