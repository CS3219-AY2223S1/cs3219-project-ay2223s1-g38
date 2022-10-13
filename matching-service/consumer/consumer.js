const amqp = require("amqplib");
const MatchEvent = require("../constants/events");

const { handleFindMessage, handleCancelMessage, handleDisconnect } = require("./messageHandler");

async function connect() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
        
		await channel.assertQueue("match-mq", {
			durable: true
		});

		channel.consume("match-mq", message => {
			const parsed = JSON.parse(message.content.toString());
			const { messageType, socketId, difficulty, userId, } = parsed;
			switch (messageType) {
			case MatchEvent.DISCONNECT:
				handleDisconnect(socketId);
				break;
			case MatchEvent.FIND:
				handleFindMessage(userId, difficulty, socketId);
				break;
			case MatchEvent.CANCEL:
				handleCancelMessage(userId, difficulty, socketId);
				break;
			default:
				break;
			}

			channel.ack(message);
		});

		console.log("Consumer ready to receive messages...");
	} catch (err) {
		console.error(err);
	}
}

module.exports = connect;




