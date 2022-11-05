import axios from "axios";

// eslint-disable-next-line no-undef
const URI_QUESTION_SVC =  process.env.URI_QUESTION_SVC || "http://localhost:8081";
// eslint-disable-next-line no-undef
const URI_HISTORY_SVC = process.env.URI_HISTORY_SVC || "http://localhost:8003";

export const getQuestion = (difficulty) => axios.post(`${URI_QUESTION_SVC}/api/question/getQuestionByDifficulty`, { difficulty: difficulty })
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});

export const getQuestionWithBlacklist = (difficulty, list) => axios.post(`${URI_QUESTION_SVC}/api/question/getQuestionWithBlackList`, { difficulty, list })
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});

export const addHistory = (uid1, uid2, roomId, qid, difficulty) => axios.post(`${URI_HISTORY_SVC}/api/history/addHistory`, { uid1, uid2, roomId, qid, difficulty })
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});

export const updateHistory = (roomId, qid) => axios.post(`${URI_HISTORY_SVC}/api/history/updateHistoryByRoomId`, { roomId, qid })
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});