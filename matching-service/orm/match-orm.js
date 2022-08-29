const { getMatches, createMatch } = require('../repository/repository');

const ormGetMatches = async () => {
  try {
    const matches = await getMatches();
    return { matches };
  } catch (err) {
    console.log('ERROR: Could not get matches');
    return { err };
  }
}

const ormCreateMatch = async(user, difficulty) => {
  try {
    const match = await createMatch({ user, difficulty });
    return { match };
  } catch (err) {
    console.log('ERROR: Could not create a new match.');
    return { err };
  }
}

module.exports = {
  ormGetMatches,
  ormCreateMatch,
}