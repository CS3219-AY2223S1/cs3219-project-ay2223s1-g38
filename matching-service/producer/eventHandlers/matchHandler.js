const MatchEvent = require("../../constants/events");
const { Priority } = require("../../constants/types");
const { generatePayload } = require("../../utils/utils");
const { publishToQueue } = require("../../utils/mq-service");
const { MQ_NAME } = require("../../constants/const");

module.exports = (io, socket) => {
	const handleFindMatchEvent = async (data) => {
		const { user, difficulty } = data;
        
		if (user === undefined || difficulty === undefined) {
			io.to(socket.id).emit(MatchEvent.FIND, "Invalid data provided.");
		}

		await publishToQueue(MQ_NAME, generatePayload(socket.id, difficulty, user, "match:find"), Priority.MATCH_FIND);
	};

	const handleCancelMatchEvent = async (data) => {
		const { user, difficulty } = data;

		if (user === undefined || difficulty === undefined) {
			io.to(socket.id).emit(MatchEvent.CANCEL, "Invalid data provided.");
		}

		await publishToQueue(MQ_NAME, generatePayload(socket.id, difficulty, user, "match:cancel"), Priority.MATCH_CANCEL);
	};
  
	socket.on(MatchEvent.FIND, handleFindMatchEvent);
	socket.on(MatchEvent.CANCEL, handleCancelMatchEvent);
};