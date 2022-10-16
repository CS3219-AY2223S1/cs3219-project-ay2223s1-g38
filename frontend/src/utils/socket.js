import { MatchEvent } from "./constants";
import { generatePayload } from "./utils";

export const findMatch = (socket, userId, difficulty) => {
	socket.emit(MatchEvent.FIND, generatePayload(userId, difficulty));
};

export const cancelMatch = (socket, userId, difficulty) => {
	socket.emit(MatchEvent.CANCEL, generatePayload(userId, difficulty));
};