const { getMatches, createMatch } = require('../controller/match-controller');

var matchRouter = require('express').Router();
matchRouter.route('/').get(getMatches);
matchRouter.route('/createMatch').post(createMatch);

module.exports = matchRouter;
