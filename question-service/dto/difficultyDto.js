import Joi from "joi";

export const difficultySchema = Joi.object({
	difficulty: Joi.string().valid("EASY", "MEDIUM", "HARD").required(),
});
