const MatchEvent = require("../constants/events");

const generateRandomRoomId = () => {
	return Math.random().toString(36).substring(3,10);
};

const generateCronJobName = (userId, socketId, difficulty) => {
	return `${userId}-${socketId}-${difficulty}`;
};

const generatePayload = (socketId, difficulty, userId, messageType) => {
	return JSON.stringify({ socketId, difficulty, userId, messageType });
};

const generateDisconnectPayload = (socketId) => {
	return JSON.stringify({ socketId, messageType: MatchEvent.DISCONNECT });
};

const isValidMatch = (user1, user2, socketId1, socketId2) => {
	return user1 != user2 && socketId1 != socketId2;
};

module.exports = {
	generateRandomRoomId,
	generateCronJobName,
	generateDisconnectPayload,
	generatePayload,
	isValidMatch
};