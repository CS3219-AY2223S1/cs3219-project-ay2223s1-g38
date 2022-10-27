const amqp = require("amqplib/callback_api");

const CONN_URL = "amqp://localhost:5672";

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
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