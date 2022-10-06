import { MatchEvent } from "./constants";

export const listen = (socket) => {
	// TODO: Set meaningful functions to run when these events are received from server.
	socket.on(MatchEvent.WAITING, () => console.log("WAITING"));

	socket.on(MatchEvent.NOT_FOUND, () => console.log("NOT FOUND"));

	socket.on(MatchEvent.CANCELLED, () => console.log("CANCELLED"));

	socket.on(MatchEvent.FOUND, () => console.log("FOUND"));
};