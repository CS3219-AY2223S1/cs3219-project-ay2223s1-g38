import { addRoom } from "../repository/collabRepository.js";
import { findRoomByUid } from "../repository/collabRepository.js";

export const addRoomService = async (userId1, userId2, roomId, questionId) => {
	const room = await addRoom(userId1, userId2, roomId, questionId);
	return room;
};

export const findRoomByUidService = async (userId) => {
	const room = await findRoomByUid(userId);
	return room;
}