import Joi from "joi";

export const updateHistorySchema = Joi.object({
	uid1: Joi.string().required(),
	uid2: Joi.string().required(),
	qid: Joi.number().required(),
});
