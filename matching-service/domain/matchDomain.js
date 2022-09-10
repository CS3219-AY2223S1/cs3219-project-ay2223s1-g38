const { getMatches, createMatch, findOrCreateMatchByDifficulty, deleteMatchByMatchInfo } = require("../repository/matchRepository");

const handleGetMatches = async () => {
	try {
		const matches = await getMatches();
		return { matches };
	} catch (err) {
		console.log("ERROR: Could not get matches");
		return { err };
	}
};

const handleCreateMatch = async (user, difficulty) => {
	try {
		const match = await createMatch({ user, difficulty });
		return { match };
	} catch (err) {
		console.log("ERROR: Could not create a new match.");
		return { err };
	}
};

const handleFindMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await findOrCreateMatchByDifficulty({ user, difficulty, socketId });
		return resp;
	} catch (err) {
		console.log("ERROR: Error while trying to find a match.");
		return { err };
	}
};

const handleDeleteMatch = async (user, difficulty, socketId) => {
	try {
		const resp = await deleteMatchByMatchInfo({ user, difficulty, socketId });
		return resp;
	} catch (err) {
		console.log("ERROR: Could not delete match from database.");
		return { err };
	}
};

module.exports = {
	handleGetMatches,
	handleCreateMatch,
	handleFindMatch,
	handleDeleteMatch,
};