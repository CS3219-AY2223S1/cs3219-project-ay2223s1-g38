import Joi from "joi";

export const deleteRoomSchema = Joi.object({
	roomId: Joi.string().required(),
});
