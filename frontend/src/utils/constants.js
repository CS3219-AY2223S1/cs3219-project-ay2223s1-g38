export const MatchEvent = {
	FIND: "match:find",
	WAITING: "match:waiting",
	FOUND: "match:found",
	NOT_FOUND: "match:notfound",
	CANCEL: "match:cancel",
	CANCELLED: "match:cancelled",
	ALREADY_IN_QUEUE: "match:already_in_queue"
};

export const MatchState = {
	WAITING_FOR_MATCH: "WAITING_FOR_MATCH",
	FINDING_MATCH: "FINDING_MATCH",
	MATCH_FOUND: "MATCH_FOUND",
	MATCH_NOT_FOUND: "MATCH_NOT_FOUND",
	NONE: "",
};