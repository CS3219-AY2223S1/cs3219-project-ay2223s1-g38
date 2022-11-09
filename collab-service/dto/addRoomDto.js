import Joi from "joi";

export const addRoomSchema = Joi.object({
	userId1: Joi.string().required(),
	userId2: Joi.string().required(),
	roomId: Joi.string().required(),
	questionId: Joi.number().required(),
});
