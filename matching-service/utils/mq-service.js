const amqp = require("amqplib/callback_api");
require('dotenv').config();

const CONN_URL = process.env.ENV === "dev" ? "amqp://localhost:5672" : process.env.MQ_CONN_URL;

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
	console.log(CONN_URL)
	conn.createChannel(function (err, channel) {
		ch = channel;
	});

   
});

const publishToQueue = async (queueName, data, priority) => {
	ch.assertQueue(queueName, {
		durable: true,
		"x-max-priority": 10,
	});

	ch.sendToQueue(queueName, Buffer.from(data), {
		persistent: true,
		priority: priority,
	});
};

process.on("exit", () => {
	ch.close();
	console.log("Closing rabbitmq channel");
});

module.exports = {
	publishToQueue
};