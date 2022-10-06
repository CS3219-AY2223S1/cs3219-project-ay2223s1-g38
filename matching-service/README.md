# Matching Service

## Setting up
1. Install necessary packages with `npm install`.
2. Set up the SQLite database with `npm run migrate`. Verify that `database.sqlite3` was created.
3. Run the Match Service with `npm run dev`.
4. Create a Docker container for RabbitMQ with `docker container run --name rabbitmq --detach -p 5672:5672 rabbitmq`.

