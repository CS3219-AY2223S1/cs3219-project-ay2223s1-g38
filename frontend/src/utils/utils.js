export const generatePayload = (user, difficulty) => {
	return { user, difficulty };
};

export const extractRoomId = (message) => {
	return message.roomId;
};

export const extractQuestionId = (message) => {
	return message.questionId;
};

export const generateSessionJoinPayload = (roomId) => {
	return { roomId };
};

export const generateUpdateQuestionPayload = (roomId, difficulty) => {
	return { roomId, difficulty };
};