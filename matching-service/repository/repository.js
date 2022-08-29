const db = require('../models');

/**
 * Retrieves all matches in the database.
 */
const getMatches = () => {
  return db.Match.findAll()
    .then((matches) => matches)
    .catch((err) => {
        console.log("There was an error querying matches.")
        throw err;
    })
}

/**
 * Creates a new Match object.
 */
const createMatch = (match) => {
  return db.Match.create(match)
  .then((match) => match)
  .catch((err) => {
    console.log("There was an error in creating a new match.")
    throw err;
  })
}

module.exports = {
  getMatches,
  createMatch,
}
