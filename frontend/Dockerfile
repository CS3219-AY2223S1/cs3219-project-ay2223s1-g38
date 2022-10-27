FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --force
COPY . . 
EXPOSE 3000
CMD ["npm", "run", "build"]