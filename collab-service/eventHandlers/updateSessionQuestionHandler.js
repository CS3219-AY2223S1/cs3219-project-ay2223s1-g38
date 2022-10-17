import { SessionEvent } from "../constants/events.js";
import { updateQuestionIdService } from "../service/collabService.js";

const updateSessionQuestionHandler = (io, socket) => {
	const handleUpdateQuestion = async (data) => {
		const { roomId, questionId } = data;
        
		if (roomId === undefined || questionId === undefined) {
            io.to(socket.id).emit(SessionEvent.UPDATE_QUESTION, "Invalid data provided.");
            return;
        }
        
        const result = await updateQuestionIdService(roomId, questionId);
        
        io.to(roomId).emit(SessionEvent.UPDATE_QUESTION, result);
	};

	socket.on(SessionEvent.UPDATE_QUESTION, handleUpdateQuestion);
};

export default updateSessionQuestionHandler;