export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_CONFLICT = 409;
export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_SUCCESS = 200;
export const FIREBASE_WRONG_PASSWORD = "auth/wrong-password";
export const MSG_WRONG_PASSWORD = "Invalid password";
export const FIREBASE_INVALID_EMAIL = "auth/invalid-email";
export const MSG_INVALID_EMAIL = "Invalid email";
export const FIREBASE_NOT_FOUND = "auth/user-not-found";
export const MSG_NOT_FOUND = "User does not exist";
export const FIREBASE_MANY_REQ = "auth/too-many-request";
export const MSG_MANY_REQ = "Too many attempts, please try again later";
export const FIREBASE_EMAIL_IN_USE = "auth/email-already-in-use";
export const MSG_EMAIL_IN_USE = "Email already in use";
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
