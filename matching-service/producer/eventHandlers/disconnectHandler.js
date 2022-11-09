const { MatchEvent } = require("../../constants/events");
const { Priority } = require("../../constants/types");
const { publishToQueue } = require("../../utils/mq-service");
const { MQ_NAME } = require("../../constants/const");
const { generateDisconnectPayload } = require("../../utils/utils");

module.exports = (io, socket) => {
	const handleDisconnect = async () => {
		console.info(`Client disconnected [id=${socket.id}]`);
		await publishToQueue(MQ_NAME, generateDisconnectPayload(socket.id), Priority.DISCONNECT);
	};
  
	socket.on(MatchEvent.DISCONNECT, handleDisconnect);
};