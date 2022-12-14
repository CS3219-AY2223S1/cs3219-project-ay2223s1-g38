import { addRoom, deleteRoom, findRoomByRoomId, findRoomByUid, updateQuestionId, addQuestionToQuestionBlacklistByRoom } from "../repository/collabRepository.js";

export const addRoomService = async (userId1, userId2, roomId, questionId) => {
	const room = await addRoom(userId1, userId2, roomId, questionId);
	return room;
};

export const findRoomByUidService = async (userId) => {
	const room = await findRoomByUid(userId);
	return room;
};

export const findRoomByRoomIdService = async (roomId) => {
	const room = await findRoomByRoomId(roomId);
	return room;
};

export const updateQuestionIdService = async (roomId, newQuestionId) => {
	const room = await findRoomByRoomId(roomId);
	if (!room) {
		return;
	}
	await addQuestionToQuestionBlacklistByRoom(room);
	await updateQuestionId(room, newQuestionId);
	const newRoom = await findRoomByRoomId(roomId);
	return newRoom;
};

export const deleteRoomService = async (roomId) => {
	const room = await findRoomByRoomId(roomId);
	if (!room) {
		return;
	}
	await deleteRoom(roomId);
	return room;
};

export const findRoomBlacklistService = async (roomId) => {
	const room = await findRoomByRoomId(roomId);
	if (!room) {
		return [];
	}

	return room.questions;
};