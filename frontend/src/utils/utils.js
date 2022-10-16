export const generatePayload = (user, difficulty) => {
	return { user, difficulty };
};

export const extractRoomId = (message) => {
	return message.split(" ")[1];
};