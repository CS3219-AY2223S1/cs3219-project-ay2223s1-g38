FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 8001
RUN npm run migrate
CMD ["npm", "start"]