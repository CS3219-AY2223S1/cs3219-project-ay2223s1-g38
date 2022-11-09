# CS3219-AY22-23-Project

# AlgoHike
## Background
AlgoHike is a web application that helps students and job seekers in the technological industry build up their confidence in tackling technical interviews through interview simulations with randomly matched strangers.

Via various features such as a question generator, collaborative editor, real time chat messaging service and video and voice chat, it provides users with a realistic environment to practise coding interviews.

## Purpose
Coding interviews are a key aspect of job hunting in the technological industry. Employers often evaluate potential employees’ capabilities by assessing how well they can solve algorithm questions and explain their solutions in a clear and effective manner. 

To aid users in landing their dream technical jobs, AlgoHike not only allows users to practise algorithm questions, but also matches them with other users so he/she can explain their solutions to them and receive feedback on areas they can improve. Through such technical interview simulations, AlgoHike aims to guide users in their algorithmic hike to the summit, and as an added bonus, meet new friends along the way.



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

