import { addRoom, findRoomByRoomId, findRoomByUid, updateQuestionId } from "../repository/collabRepository.js";

export const addRoomService = async (userId1, userId2, roomId, questionId) => {
	const room = await addRoom(userId1, userId2, roomId, questionId);
	return room;
};

export const findRoomByUidService = async (userId) => {
	const room = await findRoomByUid(userId);
	return room;
}

export const updateQuestionIdService = async (roomId, newQuestionId) => {
	const room = await findRoomByRoomId(roomId);
	console.debug(room);
	if (!room) {
		return;
	}
	const newRoom = await updateQuestionId(room, newQuestionId);
	console.debug(newRoom);
	return newRoom;
}