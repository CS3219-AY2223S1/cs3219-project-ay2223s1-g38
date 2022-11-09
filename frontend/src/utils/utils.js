export const generatePayload = (user, difficulty) => {
	return { user, difficulty };
};

export const extractDifficulty = (message) => {
	return message.difficulty;
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

export const convertToMessageBoxFields = (messageInfo, currUsername) => {
	return {
		position: currUsername === messageInfo.username ? "right" : "left",
		title: messageInfo.username,
		type: "text", 
		text: messageInfo.message,
		date: messageInfo.date
	};
};