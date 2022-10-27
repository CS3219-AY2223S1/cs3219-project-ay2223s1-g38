# CS3219-AY22-23-Project

# AlgoHike
This is our CS3219 project.

# Running application locally
1. Ensure you have Docker installed.
2. Pull the repository to your local device and `cd` into the directory.
3. Run docker-compose up -d
4. Go to localhost:3000.

# First time developer set up guide
### Software Prerequisites: 
1. MongoDB

### User Service
1. Rename `.env.sample` file to `.env`.
2. Find the `DB_CLOUD_URI` from a team member and update in `.env` file.
3. Install npm packages using `npm i`.
4. Run User Service using `npm run dev`.

### Frontend
1. Install npm packages using `npm i --force`. (Need to force due to firepad dependencies not being the most up to date)
2. Run Frontend using `npm start`.
3. Set up `.env` file by renaming the `.env.sample` file and filling up the details for the firebase project. (For collaborative code editor)
