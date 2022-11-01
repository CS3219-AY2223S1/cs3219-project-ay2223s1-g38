import Joi from "joi";

export const getHistorySchema = Joi.object({
	uid: Joi.number().required(),
});
