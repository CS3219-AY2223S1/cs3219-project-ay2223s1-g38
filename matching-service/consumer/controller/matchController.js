const { handleCreateMatch, handleFindMatch, handleDeleteMatch, checkUserHasMatch } = require("../domain/matchDomain");

const createMatch = async (user, difficulty) => {
	try {
		const resp = await handleCreateMatch(user, difficulty);
		if (resp.err) {
			return {
				error: "Could not create match."
			};
		} else {
			return {
				match: resp.match
			};
		}
	} catch (err) {
		return {
			error: "Database failure when creating a new match."
		};
	}
};

const findMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await handleFindMatch(user, difficulty, socketId);
		if (resp.err) {
			return {
				error: "Error while finding a match."
			};
		} else {
			return resp;
		}
	} catch (err) {
		return {
			error: "Database failure when finding a match."
		};
	}
};

const deleteMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await handleDeleteMatch(user, difficulty, socketId);
		if (resp.err) {
			return {
				error: "Error while deleting a match."
			};
		} else {
			return resp;
		}
	} catch {
		return {
			error: "Database failure while deleting match."
		};
	}
};

const findMatchByUser = (user) => {
	try {
		checkUserHasMatch(user);
	} catch (err) {
		return {
			error: "Database failure while finding match by user."
		};
	}
};

module.exports = {
	createMatch,
	findMatch,
	deleteMatch,
	findMatchByUser
};