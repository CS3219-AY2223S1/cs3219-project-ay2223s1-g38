const { Milliseconds } = require("../constants/types");
const { sendMessage, sendToTwoUsers, isSocketConnected, createNewSession } = require("../utils/socket");
const { generateRandomRoomId, generateCronJobName, isValidMatch } = require("../utils/utils");
const schedule = require("node-schedule");
const { findMatch, deleteMatch, deleteMatchesOnDisconnect } = require("./controller/matchController");
const { MatchEvent } = require("../constants/events");
const { findMatchByUser } = require("./repository/matchRepository");

const cancelFindMatchJob = async (user, difficulty, socketId) => {
	sendMessage(socketId, MatchEvent.NOT_FOUND, "Could not match you with another user.");
	await deleteMatch(user, difficulty, socketId);
};

const handleFindMessage = async (userId, difficulty, socketId) => {
	const userMatch = await findMatchByUser(userId);
	if (userMatch) {
		sendMessage(socketId, MatchEvent.ALREADY_IN_QUEUE, "Already in matchmaking queue.");
		return;
	}

	findMatch(userId, difficulty, socketId)
		.then(async (resp) => {
			if (resp.created) {
			// If a new Match object got created, schedule a cron job to delete the object if no match found in 30 seconds
				const startTime = new Date(Date.now() + Milliseconds.IN_THIRTY_SECONDS);
				schedule.scheduleJob(generateCronJobName(userId, socketId, difficulty), startTime,
					() => cancelFindMatchJob(userId, difficulty, socketId),
				);
				sendMessage(socketId, MatchEvent.WAITING, "Waiting for another user to join...");
			} else {
			// If a Match object was found, generate a room id and send to both socket ids
				const job = schedule.scheduledJobs[generateCronJobName(resp.match.user, resp.match.socketId, resp.match.difficulty)];
				if (job !== undefined) {
					job.cancel();
				}

				// Deletes the match that was found in the database
				deleteMatch(resp.match.user, resp.match.difficulty, resp.match.socketId);
				
				if (isSocketConnected(resp.match.socketId) && isValidMatch(userId, resp.match.user, socketId, resp.match.socketId)) {
					// If the other user is still connected, then we create the room in CollabService and emit the roomId to both users.
					const roomId = generateRandomRoomId();
					const callback = (data) => sendToTwoUsers(socketId, resp.match.socketId, MatchEvent.FOUND, data);
					const uid1 = userId;
					const uid2 = resp.match.user;
					const difficulty = resp.match.difficulty;
					createNewSession(uid1, uid2, roomId, difficulty, callback);
				} else {
					// If the other user is no longer connected, we repeat the function to try and find another match
					handleFindMessage(userId, difficulty, socketId);
				}
			}
		});
};

const handleCancelMessage = (userId, difficulty, socketId) => {
	deleteMatch(userId, difficulty, socketId)
		.then(() => {
			sendMessage(socketId, MatchEvent.CANCELLED, "You have left the matchmaking queue.");
			const job = schedule.scheduledJobs[generateCronJobName(userId, socketId, difficulty)];
			if (job !== undefined) {
				job.cancel();
			}	
		});
};

const handleDisconnect = (socketId) => {
	deleteMatchesOnDisconnect(socketId);
};

module.exports = {
	handleFindMessage,
	handleCancelMessage,
	handleDisconnect,
};