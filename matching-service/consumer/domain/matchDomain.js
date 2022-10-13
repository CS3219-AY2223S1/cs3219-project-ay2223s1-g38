const { getMatches, createMatch, findOrCreateMatchByDifficulty, deleteMatchByMatchInfo, findMatchByUser, deleteMatchBySocketId } = require("../repository/matchRepository");

const handleGetMatches = async () => {
	try {
		const matches = await getMatches();
		return { matches };
	} catch (err) {
		console.error("ERROR: Could not get matches");
		return { err };
	}
};

const handleCreateMatch = async (user, difficulty) => {
	try {
		const match = await createMatch({ user, difficulty });
		return { match };
	} catch (err) {
		console.error("ERROR: Could not create a new match.");
		return { err };
	}
};

const handleFindMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await findOrCreateMatchByDifficulty({ user, difficulty, socketId });
		return resp;
	} catch (err) {
		console.error("ERROR: Error while trying to find a match.");
		return { err };
	}
};

const handleDeleteMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await deleteMatchByMatchInfo({ user, difficulty, socketId });
		return resp;
	} catch (err) {
		console.error("ERROR: Could not delete match from database.");
		return { err };
	}
};

const checkUserHasMatch = async (user) => {
	try {
		return findMatchByUser(user);
	} catch (err) {
		console.error("ERROR: Could not check if user is in database.");
		return { err };
	}
};

const handleDeleteAllMatchesBySocketId = async (socketId) => {
	try {
		return deleteMatchBySocketId(socketId);
	} catch (err) {
		console.error("ERROR: Could not delete matches from database.");
		return { err };
	}
}

module.exports = {
	handleGetMatches,
	handleCreateMatch,
	handleFindMatch,
	handleDeleteMatch,
	checkUserHasMatch,
	handleDeleteAllMatchesBySocketId
};