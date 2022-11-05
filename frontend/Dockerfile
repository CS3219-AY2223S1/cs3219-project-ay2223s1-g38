FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --force
COPY . . 
# EXPOSE 3000
# RUN npm install -g serve
# RUN chmod +x ./run.sh
# # CMD ["/usr/app/run"]
CMD ["npm", "start"]