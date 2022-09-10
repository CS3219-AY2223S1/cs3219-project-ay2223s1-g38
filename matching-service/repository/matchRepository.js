const db = require("../models");

/**
 * Retrieves all matches in the database.
 */
const getMatches = () => {
	return db.Match.findAll()
		.then((matches) => matches)
		.catch((err) => {
			console.log("There was an error querying matches.");
			throw err;
		});
};

/**
 * Creates a new Match object.
 */
const createMatch = (match) => {
	return db.Match.create(match)
		.then((match) => match)
		.catch((err) => {
			console.log("There was an error in creating a new match.");
			throw err;
		});
};

/**
 * Finds a match object by difficulty. If no Match object is found, one is created.
 */
const findOrCreateMatchByDifficulty = async ({ user, difficulty, socketId }) => {
	const [ match, created ] = await db.Match.findOrCreate({
		where: { difficulty: difficulty },
		defaults: {
			user: user,
			difficulty: difficulty,
			socketId: socketId

		},
	});
	return { match, created };
};

const deleteMatchByMatchInfo = async ({ user, difficulty, socketId }) => {
  return await db.Match.destroy({
    where: { 
      user: user,
      difficulty: difficulty,
      socketId: socketId,
    }
  })
}

module.exports = {
	getMatches,
	createMatch,
	findOrCreateMatchByDifficulty,
  deleteMatchByMatchInfo,
};
