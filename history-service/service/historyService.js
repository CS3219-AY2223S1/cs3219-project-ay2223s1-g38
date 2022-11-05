import { addHistory, getHistory, updateHistory, updateHistoryByRoomId } from "../repository/historyRepository.js";


export const getHistoryService = async (uid) => {
	let history = await getHistory(uid);
	return history;
};

export const addHistoryService = async (uid1, uid2, roomId, qid, difficulty) => {
	let history = await addHistory(uid1, uid2, roomId, qid, difficulty);
	return history;
};

export const updateHistoryService = async (uid1, uid2, qid) => {
	let history = await updateHistory(uid1, uid2, qid);
	return history;
};

export const updateHistoryByRoomIdService = async (roomId, qid) => {
	let history = await updateHistoryByRoomId(roomId, qid);
	return history;
};