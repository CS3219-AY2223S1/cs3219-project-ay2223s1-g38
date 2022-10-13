const MatchEvent = {
	FIND: "match:find",
	WAITING: "match:waiting",
	FOUND: "match:found",
	NOT_FOUND: "match:notfound",
	CANCEL: "match:cancel",
	CANCELLED: "match:cancelled",
	ALREADY_IN_QUEUE: "match:already_in_queue",
	DISCONNECT: "disconnect"
};

module.exports = MatchEvent;