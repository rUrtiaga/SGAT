FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
ENV PROXY_API = "http://server:3001"
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]