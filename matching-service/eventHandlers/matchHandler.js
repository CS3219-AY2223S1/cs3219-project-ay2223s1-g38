const MatchEvent = require("../constants/events");
const { findMatch, deleteMatch } = require("../controller/matchController");
const schedule = require('node-schedule');
const { Milliseconds } = require("../constants/types");
const { generateCronJobName, generateRandomRoomId } = require("../utils/utils");

module.exports = (io, socket) => {
    const cancelFindMatchJob = async (user, difficulty, socketId) => {
        io.to(socketId).emit(MatchEvent.NOT_FOUND, "Could not match you with another user.");
        await deleteMatch(user, difficulty, socketId);
    }
    
	const handleFindMatchEvent = async (data) => {
		const { user, difficulty } = data;
        
		if (user === undefined || difficulty === undefined) {
			io.to(socket.id).emit(MatchEvent.FIND, "Invalid data provided.");
		}
        
		const resp = await findMatch(user, difficulty, socket.id);
        
        if (resp.created) {
            const startTime = new Date(Date.now() + Milliseconds.IN_THIRTY_SECONDS);
            schedule.scheduleJob(generateCronJobName(user, socket.id, difficulty), startTime,
                () => cancelFindMatchJob(user, difficulty, socket.id),
            );

            io.to(socket.id).emit(MatchEvent.WAITING, "Waiting for another user to join...")
        } else {
            // If a Match object was found, generate a room id and send to both socket ids
            const { user, socketId, difficulty } = resp.match;

            const job = schedule.scheduledJobs[generateCronJobName(user, socketId, difficulty)];
            job.cancel();

            const roomId = generateRandomRoomId();
            const roomString = `Room: ${roomId}`;

            io.to(socketId).emit(MatchEvent.FOUND, roomString)
            io.to(socket.id).emit(MatchEvent.FOUND, roomString);

            await deleteMatch(user, difficulty, socketId);
        }
	};
  
	socket.on(MatchEvent.FIND, handleFindMatchEvent);
};