FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 8003
CMD ["npm", "start"]