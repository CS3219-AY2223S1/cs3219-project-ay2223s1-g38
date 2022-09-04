const { getMatches, createMatch } = require('../controller/matchController');

var matchRouter = require('express').Router();
matchRouter.route('/').get(getMatches);

// TODO: Remove this route once done with MatchService, only for testing purposes.
matchRouter.route('/createMatch').post(createMatch);

module.exports = matchRouter;
