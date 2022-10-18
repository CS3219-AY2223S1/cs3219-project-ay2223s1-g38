export const generatePayload = (user, difficulty) => {
	return { user, difficulty };
};

export const extractRoomId = (message) => {
	return message.split(" ")[1];
};

export const generateSessionJoinPayload = (roomId) => {
	return { roomId };
};

export const generateUpdateQuestionPayload = (roomId, difficulty) => {
	return { roomId, difficulty };
};