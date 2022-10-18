import { SessionEvent } from "../constants/events.js";
import { findRoomBlacklistService, updateQuestionIdService } from "../service/collabService.js";
import { getQuestion } from "../utils/request.js";

const updateSessionQuestionHandler = (io, socket) => {
	const handleUpdateQuestion = async (data) => {
		const { roomId, difficulty } = data;
        
		if (roomId === undefined || difficulty === undefined) {
            io.to(socket.id).emit(SessionEvent.UPDATE_QUESTION, "Invalid data provided.");
            return;
        }

        const blacklist = await findRoomBlacklistService(roomId);

        // TODO: Send blacklist of questions (i.e. encountered questions) in each session to QuestionService.
        const question = await getQuestion(difficulty);
        if (question === undefined) {
            io.to(socket.id).emit(SessionEvent.CREATE, "Something went wrong with the Question Service.")
            return;
        }
        
        const questionId = question.data.question.questionId;

        
        const result = await updateQuestionIdService(roomId, questionId);
        
        io.to(roomId).emit(SessionEvent.UPDATE_QUESTION, result);
	};

	socket.on(SessionEvent.UPDATE_QUESTION, handleUpdateQuestion);
};

export default updateSessionQuestionHandler;