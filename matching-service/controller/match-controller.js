const { ormGetMatches, ormCreateMatch } = require('../orm/match-orm');
const { generateRandomRoomId } = require('../utils/utils');

const getMatches = async (req, res) => {
  try {
    const resp = await ormGetMatches();
    if (resp.err) {
      return res.status(400).json({ message: 'Could not get matches.' })
    } else {
      return res.status(200).json({ matches: resp.matches });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Database failure when getting matches.' })
  }
}

// TODO: Remove this function once it is obsolete. Currently it is here for
// testing purposes.
const createMatch = async (req, res) => {
  try {
    const { user, difficulty } = req.body;
    const resp = await ormCreateMatch(user, difficulty);
    if (resp.error) {
      return res.status(400).json({ message: 'Could not create a new match.' });
    } else {
      return res.status(200).json({ match: resp.match });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Database failure when creating a new match.' })
  }
}

module.exports = {
  getMatches,
  createMatch,
}