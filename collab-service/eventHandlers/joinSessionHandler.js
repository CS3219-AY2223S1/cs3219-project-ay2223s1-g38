import { SessionEvent } from "../constants/events.js";
import { findRoomByRoomIdService } from "../service/collabService.js";
import schedule from "node-schedule";
import { generateCronJobName } from "../utils/utils.js";

const joinSessionHandler = (io, socket) => {
	const handleJoin = async (data) => {
        const { roomId } = data;
        
		if (roomId === undefined) {
            io.to(socket.id).emit(SessionEvent.JOIN, "Invalid data provided.");
            return;
        }

        const job = schedule.scheduledJobs[generateCronJobName(roomId)];
        if (!job) {
            job.cancel();
        }

        // When client emits session:join event, put client's socket inside Room [roomId].
        // This allows client to listen to any updates in the session e.g. update in question.
        console.info(`Client [id=${socket.id}] joined room [roomId=${roomId}].`);
        socket.join(roomId);
        
        const room = await findRoomByRoomIdService(roomId);

        io.to(roomId).emit(SessionEvent.JOIN, room);
	};

	socket.on(SessionEvent.JOIN, handleJoin);
};

export default joinSessionHandler;