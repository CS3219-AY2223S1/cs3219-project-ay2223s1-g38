import Joi from "joi";

export const findRoomSchema = Joi.object({
	userId: Joi.string().required(),
});
