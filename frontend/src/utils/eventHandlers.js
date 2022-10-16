import { useDispatch } from "react-redux";

import { setRoom } from "../features/match/matchSlice";

import { MatchEvent } from "./constants";
import { extractRoomId } from "./utils";

export const listen = (socket) => {
	const dispatch = useDispatch(); 

	// TODO: Set meaningful functions to run when these events are received from server.
	socket.on(MatchEvent.WAITING, () => console.log("WAITING"));

	socket.on(MatchEvent.NOT_FOUND, () => console.log("NOT FOUND"));

	socket.on(MatchEvent.CANCELLED, () => console.log("CANCELLED"));

	socket.on(MatchEvent.FOUND, (msg) => {
		dispatch(setRoom(extractRoomId(msg)));
	});
};