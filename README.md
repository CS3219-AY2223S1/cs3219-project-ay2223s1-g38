# CS3219-AY22-23-Project

# AlgoHike
This is our CS3219 project.

# Running application locally
1. Ensure you have Docker installed.
2. Pull the repository to your local device and `cd` into the directory.
3. Ensure that you have the necessary .env files for the different services. Obtain the environment variables from [here](https://drive.google.com/drive/folders/19W-aJ8sCx0g9EkEqVuJvIHJppAJ8o36U).
4. Ensure you insert the `.env` files into the correct microservices, e.g. insert the `.env` file in user-service folder on Google Drive into the user-service folder. Remember to rename the files to `.env` (they are stored as just `env` on Google Drive).
5. Run docker-compose up -d.
6. Go to localhost:3000.

# First time developer set up guide
### Software Prerequisites: 
1. MongoDB
2. RabbitMQ

### Frontend
1. Install npm packages using `npm i --force`. (Need to force due to firepad dependencies not being the most up to date)
2. Run Frontend using `npm start`.
3. Set up `.env` file by renaming the `.env.sample` file and filling up the details for the firebase project. (For collaborative code editor)

### Matching Service
1. Install necessary packages with `npm install`.
2. Set up the SQLite database with `npm run migrate`. Verify that `database.sqlite3` was created.
3. Create a Docker container for RabbitMQ with `docker container run --name rabbitmq --detach -p 5672:5672 rabbitmq`.
4. Run the Match Service with `npm run dev`.

### Other Services
1. Install necessary packages with `npm install`.
2. Obtain the `.env` file from the link above.
3. Run the development server with `npm run dev`.

