import Joi from "joi";

export const addHistorySchema = Joi.object({
	uid1: Joi.string().required(),
	uid2: Joi.string().required(),
	qid: Joi.number().required(),
	difficulty: Joi.string().valid("EASY", "MEDIUM", "HARD").required(),
});
