const generateRandomRoomId = () => {
	return Math.random().toString(36).substring(3,10);
};

const generateCronJobName = (userId, socketId, difficulty) => {
	return `${userId}-${socketId}-${difficulty}`;
};

module.exports = {
	generateRandomRoomId,
	generateCronJobName
};