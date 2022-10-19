import { MatchEvent, SessionEvent } from "./constants";
import { generatePayload, generateSessionJoinPayload, generateUpdateQuestionPayload } from "./utils";

export const findMatch = (socket, userId, difficulty) => {
	socket.emit(MatchEvent.FIND, generatePayload(userId, difficulty));
};

export const cancelMatch = (socket, userId, difficulty) => {
	socket.emit(MatchEvent.CANCEL, generatePayload(userId, difficulty));
};

export const joinSession = (socket, roomId) => {
	socket.emit(SessionEvent.JOIN, generateSessionJoinPayload(roomId));
};

export const updateQuestion = (socket, roomId, difficulty) => {
	socket.emit(SessionEvent.QUESTION_UPDATE, generateUpdateQuestionPayload(roomId, difficulty));
};