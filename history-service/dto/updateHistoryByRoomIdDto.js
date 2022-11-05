import Joi from "joi";

export const updateHistoryByRoomIdSchema = Joi.object({
	roomId: Joi.string().required(),
	qid: Joi.number().required(),
});
