import schedule from "node-schedule";

import { SessionEvent } from "../constants/events.js";
import { Milliseconds } from "../constants/types.js";
import { addRoomService, deleteRoomService } from "../service/collabService.js";
import { addHistory, getQuestion } from "../utils/request.js";
import { generateCronJobName } from "../utils/utils.js";

const createSessionHandler = (io, socket) => {
	const handleCreateSession = async (data) => {
		const { roomId, uid1, uid2, difficulty } = data;
        
		if (roomId === undefined || uid1 === undefined || uid2 === undefined || difficulty === undefined) {
			io.to(socket.id).emit(SessionEvent.CREATE, "Invalid data provided.");
			return;
		}
		const question = await getQuestion(difficulty);
		if (question === undefined) {
			io.to(socket.id).emit(SessionEvent.CREATE, { error: "Something went wrong with the Question Service." });
			return;
		}
        
		const questionId = question.data.question.questionId;

		const room = await addRoomService(uid1, uid2, roomId, questionId);
		await addHistory(uid1, uid2, roomId, questionId, difficulty);
		
		// Schedule cron job that deletes session after a certain amount of time.
		const startTime = new Date(Date.now() + Milliseconds.IN_ONE_HOUR);
		schedule.scheduleJob(generateCronJobName(roomId), startTime,
			() => deleteRoomService(roomId));

		io.to(socket.id).emit(SessionEvent.CREATE, room);
	};

	socket.on(SessionEvent.CREATE, handleCreateSession);
};

export default createSessionHandler;