import Joi from "joi";

export const updateQuestionIdSchema = Joi.object({
	roomId: Joi.string().required(),
    newQuestionId: Joi.number().required(),
});
