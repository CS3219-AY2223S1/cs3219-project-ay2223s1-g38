import { useDispatch } from "react-redux";

import { setRoom } from "../features/match/matchSlice";
import { setQuestionId } from "../features/session/sessionSlice";

import { MatchEvent, SessionEvent } from "./constants";
import {  extractQuestionId, extractRoomId } from "./utils";

export const listenMatch = (socket) => {
	const dispatch = useDispatch(); 

	// TODO: Set meaningful functions to run when these events are received from server.
	socket.on(MatchEvent.WAITING, () => console.log("WAITING"));

	socket.on(MatchEvent.NOT_FOUND, () => console.log("NOT FOUND"));

	socket.on(MatchEvent.CANCELLED, () => console.log("CANCELLED"));

	socket.on(MatchEvent.FOUND, (msg) => {
		dispatch(setRoom(extractRoomId(msg)));
		dispatch(setQuestionId(extractQuestionId(msg)));
	});
};

export const listenSession = (socket) => {
	const dispatch = useDispatch();

	socket.on(SessionEvent.JOIN, (msg) => {
		dispatch(setQuestionId(msg.questionId));
	});

	socket.on(SessionEvent.QUESTION_UPDATE, (msg) => {
		console.log("Received reply" + JSON.stringify(msg));
		dispatch(setQuestionId(msg.questionId));
	}); 
};