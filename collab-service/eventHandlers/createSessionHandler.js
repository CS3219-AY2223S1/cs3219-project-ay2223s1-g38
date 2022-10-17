import { SessionEvent } from "../constants/events.js";
import { addRoomService } from "../service/collabService.js";
import { getQuestion } from "../utils/request.js";

const createSessionHandler = (io, socket) => {
	const handleCreateSession = async (data) => {
		const { roomId, uid1, uid2, difficulty } = data;
        
		if (roomId === undefined || uid1 === undefined || uid2 === undefined || difficulty === undefined) {
            io.to(socket.id).emit(SessionEvent.CREATE, "Invalid data provided.");
            return;
        }
        
        const question = await getQuestion(difficulty);
        if (question === undefined) {
            io.to(socket.id).emit(SessionEvent.CREATE, "Something went wrong with the Question Service.")
            return;
        }

        const questionId = question.data.question.questionId;

        const room = await addRoomService(uid1, uid2, roomId, questionId);
        
        io.to(socket.id).emit(SessionEvent.CREATE, room);
	};

	socket.on(SessionEvent.CREATE, handleCreateSession);
};

export default createSessionHandler;